import { sum } from "../../../sum"

test("sum fn should find the sum of 2 nos",()=>{//description,cb fn
 const result = sum(3,4);

 expect(result).toBe(7);//assertion
})