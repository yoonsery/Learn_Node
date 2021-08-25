const path = require('path');

// 운영체제별로 표기법이 다르다
// POSIX (Unix: Mac, Linux): 'Users/temp/myfile.html'
// Windows: 'C:\\temp\\myfile.html'

console.log(__dirname);
console.log(__filename);

console.log(path.sep); // 경로구분자
console.log(path.delimiter); // 환경변수 구분자 확인

// basename API
console.log(path.basename(__filename)); // 현재파일명.확장자 출력, -> file 정보만 읽어옴
console.log(path.basename(__filename, '.js')); // 파일 이름만 출력

// dirname
console.log(path.dirname(__filename)); // 디렉토리 이름만 가져옴

// extension
console.log(path.extname(__filename)); // 확장자만 출력

// parse | 전체 경로를 분리해서 출력
const parsed = path.parse(__filename);
console.log(parsed); // { root, dir, base, ext, name }으로 분리되서 object 형태로 출력
parsed.root;
parsed.name; // 이렇게 접근 가능함

// obj -> string 형태로 변환도 가능
const str = path.format(parsed);
console.log(str); // 기존의 경로 string 형태로 출력

// isAbsolute | 절대경로인지 확인, 결과는  t/f로 나옴
console.log('isAbsolute?', path.isAbsolute(__dirname));
console.log('isAbsolute?', path.isAbsolute('../'));

// normalize
console.log(path.normalize('./folder//////sub')); // 이상한 경로를 알아서 수정

// join
// console.log(__dirname + '/' + 'image');  // 구분자가 다른 window에서는 사용하면 안된다
console.log(__dirname + path.sep + 'image'); // 경로안에 image폴더를 만듦
console.log(path.join(__dirname, 'image'));
