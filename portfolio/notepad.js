let x=(x,y,p)=>{
  let a=['#','#','#','\n','#','#','#','\n','#','#','#',]
  let i=x*y+x
  if(a[i]=='#'){
    a[i]=p
    return a.join()
  }
  return 0
}

console.log(x(0,0,'o'));

x=(c=>(a,b,z)=>(
  d=[...c]).splice(a+b*4,1,z)[0]=='#'&&(c=d).join(''))
  ('###\n###\n###'.split(''));
