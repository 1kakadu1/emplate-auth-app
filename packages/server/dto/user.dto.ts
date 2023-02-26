import { User } from '../entities';

export class UserDto {
	id: number;
	email: string;
	name: string;
	constructor(model: User) {
		this.email = model.email;
		this.id = model.id;
		this.name = model.name;
	}

	// toJSON(){
	//     return{
	//         id: this.id,
	//         email: this.email,
	//         name: this.name,
	//     }
	// }
}
