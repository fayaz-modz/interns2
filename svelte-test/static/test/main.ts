
enum Gender { Male, Female }

const user = {
    name: 'test',
    age: 17,
    gender: Gender.Male
}

function sayHi(user_data: {name: string; age: number}) {
    console.log(user_data.age / 8);
}

sayHi(user)
