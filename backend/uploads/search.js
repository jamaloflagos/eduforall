// const linear_search = (list, target) => {
//     for(let i = 0; i <= list.length; i++) {
//         if(list[i] == target) return i;
//     }
//     return -1 
// }

// const binary_search = (list, target) => {
//     let start = 0
//     let end = list.length - 1

//     while(start <= end) {
//         const midPoint = Math.floor((start + end) / 2)

//         if(list[midPoint] == target) {
//             return midPoint
//         } else if(list[midPoint] < target) {
//             start = midPoint + 1
//         } else {
//             end = midPoint - 1
//         }
//     }

//     return -1
// }

// const recursive_binary_search = (arr, target, start = 0, end = arr.length - 1) => {
//     if (start > end) {
//         return
//     }

//     const midPoint = Math.floor((start + end) / 2)
//     if (arr[midPoint] == target) {
//         return midPoint
//     } else if (midPoint < target) {
//         recursive_binary_search(arr, target, midPoint + 1, end)
//     } else {
//         recursive_binary_search(arr, target, start, midPoint - 1)
//     }
// }

// const recursion = (arr, target) => {
//     if (arr.length == 0) {
//         return -1
//     } else {
//         const midpoint = Math.floor(arr.length / 2)
//         console.log(midpoint)

//         if (arr[midpoint] == target) {
//             return midpoint
//         } else {
//             if (arr[midpoint] < target) {
//                 console.log("target greater than", arr[midpoint])
//                 console.log(arr.slice(midpoint + 1))
//                 return recursion(arr.slice(midpoint + 1), target)
//             } else {
//                 return recursion(arr.slice(0, midpoint), target)
//             }
//         }
//     }
// }


// const verify = index => {
//     if(index == -1) {
//         console.log("Target not found!");
//     } else {
//         console.log(`Target found in the list at index: ${index}`)
//     }
// }

// const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const result = linear_search(list, 10);
// verify(result)

// const binary_res = binary_search(list, 10)
// verify(binary_res)

// const recursive = recursive_binary_search(list, 5)
// verify(recursive)

// const recurse = recursion(list, 8)
// verify(recurse)

// const obj = {name: "jamal"}
// console.log(Object.prototype)

const student = {
    name: "Jamal",
    matric_no: 210115050,
    grades: 4.6,

    get_grades() {
        console.log(this.grades)
    }
}

student.get_grades()
console.log(student)
console.log(student["name"])
student.name = "Toyin"
console.log(student["name"])
student.dept = "Computer"
console.log(student)

const objName = "faculty"
student[objName] = "science"
console.log(student)

function createObject(name, gender) {
    const obj = {}
    obj.name = name
    obj.gender = gender
    obj.displayName = function() {
        console.log(this.name)
    }

    return obj
}

const object1 = createObject("Jaamal", "Male")
object1.displayName()

function Student(name) {
    this.name = name
    this.displayName = function(){
        console.log(name)
    }
}

const first = new Student("jamal")
first.displayName()
console.log(Object.getPrototypeOf(first))

const newStudent = Object.create(student)
newStudent.place = "Nigeria"
console.log(newStudent)
newStudent.get_grades()

Object.assign(Student.prototype, student)
const him = new Student("Toyin")
console.log(him.matric_no)

const personPrototype = {
    getName() {
        console.log(this.name)
    },

    getGender() {
        console.log(this.gender)
    }


}

function Person(name, gender) {
    this.name = name
    this.gender = gender
}

Object.assign(Person.prototype, personPrototype)

const person1 = new Person("Jamal", "Male")
const person2 = new Person("Atoke", "Female")

person1.getGender()
person2.getName()

class Parent {
    name
    gender
    constructor(name, gender) {
        this.name = name
        this.gender = gender
        this.phone = "08135536774"
    }

    displayName() {
        console.log(this.name, this.phone)
    }
}

const ishaq = new Parent("Ishaq", "Male")
ishaq.displayName()
console.log(ishaq)

console.log("boy" == "boys")