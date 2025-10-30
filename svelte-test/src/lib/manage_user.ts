interface User {
	name: string;
	age: number;
	type: UserType;
}

type Admin = {
	name: string;
	age: number;
	type: 'admin';
};

type UserType = User | undefined;

enum Gender {
	Male,
	Female
}

export function sayHi(user: User) {
	console.log(typeof user.age);
	if (user.age / 2 > 8) {
		console.log('adult');
	} else {
		console.log('minor');
	}

	if (user.type === 'admin') {
		console.log('admin');
	} else if (user.type == 'user') {
		console.log('common');
	}
	console.log(user.name);
}

sayHi({
	name: 'test',
	age: 17,
	type: 'user'
});
