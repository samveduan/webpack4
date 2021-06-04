import func1 from './moudle1'
import func2 from './moudle2'
import '../css/demo.less'
import '../css/iconfont.less'

const word = "webpack!";
console.log("webpack!");
console.log(func1(1, 2));
func2().then(data=>{
    console.log(data);
}).catch(error=>{
    console.log(error);
})

