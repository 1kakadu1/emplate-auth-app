import bcrypt from "bcrypt";
import { DI } from "../app";
import { UserDto } from "../dto/user.dto";
import { ApiError } from "../exeptions/api-error";
import { IRequestData } from "../types/request.type";
import { TokenServices } from "./tokenServices";

export class UserServices {
  async registration(
    email: string,
    password: string
  ): Promise<
    IRequestData<{ user: UserDto; accessToken: string; refreshToken: string }>
  > {
    const user = await DI.userRepository.findOne({
      email: email,
    });

    if (user) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const newUser = await DI.userRepository.create({
      email,
      password: hashPassword,
      name: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await DI.userRepository.persist(newUser).flush();
    const tokenServices = new TokenServices();
    const userDto = new UserDto(newUser);
    const tokens = tokenServices.generateTokens(userDto);
    await tokenServices.saveToken({ ...userDto }, tokens.refreshToken);

    return {
      data: {
        user: userDto,
        ...tokens,
      },
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<
    IRequestData<{ user: UserDto; accessToken: string; refreshToken: string }>
  > {
    const user = await DI.userRepository.findOne({
      email: email,
    });

    if (user === null) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const tokenServices = new TokenServices();
    const userDto = new UserDto(user);
    const tokens = tokenServices.generateTokens(userDto);
    await tokenServices.saveToken({ ...userDto }, tokens.refreshToken);

    return {
      data: {
        user: userDto,
        ...tokens,
      },
    };
  }

  async logout(refreshToken: string): Promise<IRequestData<string>> {
    const tokenServices = new TokenServices();
    const tokenRemove = await tokenServices.removeToken(refreshToken);
    if (tokenRemove) {
      return {
        data: "Токен удален",
      };
    }

    throw ApiError.BadRequest("Ошибка при удалении токена");
  }

  async refresh(
    refreshToken: string | null
  ): Promise<
    IRequestData<{ user: UserDto; accessToken: string; refreshToken: string }>
  > {
    const tokenServices = new TokenServices();
    if (!refreshToken) {
      throw ApiError.BadRequest("Проблема в определении токена");
    }

    const userDataToken = tokenServices.validateRefreshToken(refreshToken);
    const checkToken = await tokenServices.findToken(refreshToken);
    if (!userDataToken || !checkToken) {
      throw ApiError.BadRequest("Токен не найден!");
    }

    const user = await DI.userRepository.findOne({
      id: (userDataToken as UserDto).id,
    });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с токеном ненайден");
    }
    const userDto = new UserDto(user);
    const tokens = tokenServices.generateTokens(userDto);
    await tokenServices.saveToken({ ...userDto }, tokens.refreshToken);

    return {
      data: {
        user: userDto,
        ...tokens,
      },
    };
  }

  async getUserById(id: number): Promise<IRequestData<{ user: UserDto }>> {
    const user = await DI.userRepository.findOne({ id });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с  ${id} ненайден`);
    }
    const userDto = new UserDto(user);

    return {
      data: {
        user: userDto,
      },
    };
  }
}
