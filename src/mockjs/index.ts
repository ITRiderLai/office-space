// @ts-ignore
import Mock from'mockjs';
import user from './user';
import business from './business';

Mock.mock(/\/user\/login/,'post',(req: any,res: any) =>{
    return user.getLogin(req,res)
});

Mock.mock(/\/user\/info/,'post',(req: any,res: any) =>{
    return user.getInfo(req,res)
});

Mock.mock(/\/user\/menu/,'get',(req: any,res: any) =>{
    return user.getMenu(req,res)
});

Mock.mock(/\/user\/permission/,'get',(req: any,res: any) =>{
    return user.getPermission(req,res)
});

Mock.mock(/\/file\/upload/,'post',(req: any,res: any) =>{
    return user.getUpload(req,res)
});

// 业务申请相关接口
Mock.mock(/\/business\/ownership\/init/,'get',(req: any,res: any) =>{
    return business.getBusinessInit(req,res)
});

Mock.mock(/\/unit\/list/,'post',(req: any,res: any) =>{
    return business.getUnitList(req,res)
});

Mock.mock(/\/building\/list/,'post',(req: any,res: any) =>{
    return business.getBuildingList(req,res)
});

Mock.mock(/\/business\/ownership\/save/,'post',(req: any,res: any) =>{
    return business.saveApplication(req,res)
});

// 设置延迟模拟真实网络
Mock.setup({ timeout: '200-500' });

export default Mock;