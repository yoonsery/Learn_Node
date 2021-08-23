function hello() {
  console.log(this);
  console.log(this === global); // true
}

hello();

class A {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log('------ class ------');
    console.log(this);
    console.log(this === global); // false, class 안에서 this는 자기자신
  }
}

const a = new A(1);
a.memberFunction();

console.log('--- global scope ---');
console.log(this); // {}
console.log(this === module.exports); // true
