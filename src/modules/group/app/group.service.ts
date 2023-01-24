/* eslint-disable dot-notation */
import { Injectable, NotFoundException } from '@nestjs/common';
import type { IFile } from 'interfaces';

import { RoleType } from '../../../constants/role-type';
import { FileNotExcelException } from '../../../exceptions/file/file-not-exel.exception';
import { FileService } from '../../../shared/services/file.service';
import { GeneratorService } from '../../../shared/services/generator.service';
import { ValidatorService } from '../../../shared/services/validator.service';
import { AuthService } from '../../auth/app/auth.service';
import type { UserRegisterDto } from '../../auth/interface/dto/register.dto';
import { MailService } from '../../mail/mail.service';
import { UserService } from '../../user/app/user.service';
import type { UserEntity } from '../../user/domain/entity/user.entity';
import type { GroupEntity } from '../domain/entity/group.entity';
import { GroupRepository } from '../infra/group.repository';
import type { GroupDto, MemberGroupDto } from '../interface/dto/group.dto';
import type { QueryGroupDto } from '../interface/dto/query.dto';

@Injectable()
export class GroupService {
  constructor(
    private groupRepository: GroupRepository,
    private userService: UserService,
    private generatorService: GeneratorService,
    private validatorService: ValidatorService,
    private fileService: FileService,
    private mailService: MailService,
    private authService: AuthService,
  ) {}

  async createGroup(
    user: UserEntity,
    groupDto: GroupDto,
  ): Promise<GroupEntity> {
    const memberEntities = await this.createMembersForGroup(groupDto.members);

    const groupEntity = {
      ...groupDto,
      members: memberEntities.map((entity) => entity.id || ''),
      createdBy: user.id,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    return this.groupRepository.create(groupEntity);
  }

  public findAll(
    user: UserEntity,
    queryOption: QueryGroupDto,
  ): Promise<GroupEntity[]> {
    const query =
      user.role !== RoleType.ADMIN
        ? { createdBy: user.id, ...queryOption }
        : queryOption;

    return this.groupRepository.findAll(query);
  }

  public async getMembers(groupId: string) {
    const group = await this.groupRepository.findOne(groupId);

    return group ? group.memberEntities : [];
  }

  public async findOne(
    user: UserEntity,
    groupId: string,
  ): Promise<GroupEntity> {
    if (user.role === RoleType.ADMIN) {
      return this.groupRepository.findOne(groupId);
    }

    const group = await this.groupRepository.findOne(groupId, user.id || '');

    if (!group) {
      throw new NotFoundException(
        'Group does not exist or not allow to update',
      );
    }

    return group;
  }

  public async delete(user: UserEntity, groupId: string): Promise<void> {
    // validate group
    const group = await this.findOne(user, groupId);

    if (!group) {
      throw new NotFoundException(
        'Group does not exist or not allow to update',
      );
    }

    await this.groupRepository.delete(groupId);
  }

  public async updateOne(
    user: UserEntity,
    groupId: string,
    groupDto: GroupDto,
  ): Promise<GroupEntity> {
    // validate group
    const group = await this.findOne(user, groupId);

    if (!group) {
      throw new NotFoundException(
        'Group does not exist or not allow to update',
      );
    }

    const memberEntities = await this.createMembersForGroup(groupDto.members);

    const groupEntity = {
      ...group,
      ...groupDto,
      members: memberEntities.map((entity) => entity.id || ''),
    };

    return this.groupRepository.update(groupEntity);
  }

  public parseFile(file: IFile) {
    if (file && !this.validatorService.isExcel(file.mimetype)) {
      throw new FileNotExcelException(
        'Only alow to upload exel file (.xlsx, .xls, .csv)',
      );
    }

    const data = this.fileService.parseExcelFIle(file);

    return data.map((raw) => ({
      name: raw['name'],
      email: raw['email'],
    }));
  }

  private async createMembersForGroup(
    members: MemberGroupDto[],
  ): Promise<UserEntity[]> {
    // Get all user
    const userEntities = await this.userService.findAll();
    // eslint-disable-next-line unicorn/no-array-reduce
    const userEmails = userEntities.reduce((map, userEntity) => {
      map[userEntity.email.toString()] = userEntity;

      return map;
    }, {});

    const memberEntities = await Promise.all(
      (members || []).map(async (member) => {
        if (userEmails[member.email]) {
          return userEmails[member.email];
        }

        const password = this.generatorService.generatePassword(8);

        const userDto: UserRegisterDto = {
          name: member.name,
          email: member.email,
          password,
        };

        const newUser = await this.userService.createUser(userDto);

        // Send email
        await this.handleSendEmailChangePass(newUser);

        return newUser;
      }),
    );

    return memberEntities;
  }

  private async handleSendEmailChangePass(user: UserEntity) {
    try {
      const token = await this.authService.createAccessToken({
        role: RoleType.USER,
        userId: user.id,
      });

      await this.mailService.sendEmailChangePassword(user, token.accessToken);
    } catch (error) {
      console.error(error);
    }
  }
}
