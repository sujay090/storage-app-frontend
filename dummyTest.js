const shouldPass = Math.random() < 0.5;

if(shouldPass){
    console.log("Test passed")
    process.exit(0);
}else{
    console.log("Test failed");
    process.exit(1);
}