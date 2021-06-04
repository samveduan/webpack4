export default function func2(a, b){
    return new Promise((resolve, reject) => {
        const num = Math.random();
        if(num<=0.5){
            resolve(`随机数${num}小于0.5`);
        }else{
            reject(`随机数${num}大于0.5`);
        }
    })
}