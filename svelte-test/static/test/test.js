var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
var user = {
    name: 'test',
    age: 17,
    gender: Gender.Male
};
function sayHi(user_data) {
    console.log(user_data.age / 8);
}
sayHi(user);
