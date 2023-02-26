import jwt, { JwtPayload } from 'jsonwebtoken';
import { DI } from '../app';
import { UserDto } from '../dto/user.dto';

export class TokenServices {
	generateTokens(payload: UserDto) {
		const accessToken = jwt.sign(
			{ name: payload.name, email: payload.email, id: payload.id },
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: '5m' },
		);
		const refreshToken = jwt.sign(
			{ name: payload.name, email: payload.email, id: payload.id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: '30d' },
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(user: UserDto, refreshToken: string) {
		const tokenData = await DI.tokenRepository.findOne({ user: user.id });

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			await DI.tokenRepository.flush();
			return refreshToken;
		}

		const token = await DI.tokenRepository.create({
			user: user,
			refreshToken,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		await DI.tokenRepository.persist(token).flush();
		return token;
	}

	async removeToken(refreshToken: string) {
		const token = await DI.tokenRepository.findOne({ refreshToken });
		if (token) {
			return await DI.tokenRepository.remove(token);
		}

		return null;
	}

	async findToken(refreshToken: string | JwtPayload | null) {
		console.log('refreshToken', refreshToken);
		if (refreshToken) {
			return await DI.tokenRepository.findOne({
				refreshToken: typeof refreshToken === 'string' ? refreshToken : refreshToken.toString(),
			});
		}
		return null;
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
}
