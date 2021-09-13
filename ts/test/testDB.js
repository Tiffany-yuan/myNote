<script type="text/javascript">
(function (window) {
    var h = Tatami.localcache.get('loginUserData', 'session'),
        taobaoId = h.taobaoId,
        version,
        vip,
        expireDate,
        nowDateObj = new Date(),
        daysToExpire,
        expireDateObj,
        isShowDialog = false,
        standardPrintNums,
        areaHtml;
    var DBFirst = window.localStorage.getItem('DBFirst');
    Tatami.controls.get('control.sellerList').getMethod('getSellerList', function (data) {
        $.each(data.sellers, function (index, i) {
            if (i.taobaoId == taobaoId) {
                expireDate = i.expireDate;
                vip = i.vip;
                standardPrintNums = Number(i.standardPrintNums);
            }
        });

        if (expireDate) {
            expireDateObj = new Date();
            var dateStr = expireDate.split(' ')[0];
            var dateStrArr = dateStr.split('-');
            expireDateObj.setFullYear(dateStrArr[0]);
            expireDateObj.setMonth(dateStrArr[1] - 1);
            expireDateObj.setDate(dateStrArr[2]);
            expireDateObj.setHours(0, 0, 0);
            daysToExpire = parseInt((expireDateObj.getTime() - nowDateObj.getTime()) / (24 * 3600 * 1000)) + 1;

            // 用于测试
            // vip = -1;  // -1或-3：试用，大于0：非试用
            // data.sellers.length = 1;  // 1为单店铺 大于1为多店铺
            // daysToExpire = 3;  //过期时间

            if (daysToExpire > 5 && (vip == -1 || vip == -3 || vip == -5)) {
                isShowDialog = true;
            }else if(vip > 0 && daysToExpire > 7){
                isShowDialog = true;
            }
            if(vip != 3 && vip != 1 && vip != 5 ){
                isShowDialog = false;
            }
            // 若是第一次进入p64，也展示
            if (!DBFirst) {
                isShowDialog = true;
                window.localStorage.setItem('DBFirst', 1);
            }

            if (isShowDialog) {
                //todo 展示弹窗

               (function(){
                        var advertisement;
                        var visible = ["p64"],flag = false;
                        for(var i = 0 ; i < visible.length ; i ++ ){
                            if($.trim(visible[i]) && window.location.host.indexOf($.trim(visible[i])) > -1){
                                flag = true;
                            }
                        }
                        if(!flag){return;}
                        var Advertisement = function(){
                            function Impl(){}
                            function bindListener(dom){
                                dom.on("click",".close",function(){
                                    dom.remove();
                                });
                                dom.on("click",".feedback",function(){
                                    Tatami.pub("AD.SYS.FEEDBACK",8169);
                                });
                            }
                            Impl.show = function(){
                                var html = '<div id="" class="advertisement" style="position: fixed;top: 50%;left: 50%;margin-left: -322px;margin-top: -222.5px;"><img border="0" usemap="#planetmap" src="https://img.alicdn.com/imgextra/i1/69942425/O1CN01ioOWWi1Tmgy7i29VU_!!69942425.png" alt="" style="height:445px;width=644px"><map name="planetmap" id="planetmap"><area style="background:rgba(0,0,0,0)" class="close J-clickPoint feedback" shape="rect" coords="21,76,616,254" href="http://www.kuaidizs.cn/helpMap/getDetail?detailId=512" target="_blank"  data-clickData-points="point=11194.11720.31506.31508&_fm=7177"><area style="background:rgba(0,0,0,0)" class="close J-clickPoint feedback" shape="rect" coords="501,378,595,418"   data-clickData-points="point=11194.11720.31506.31510&_fm=7179"><area style="background:rgba(0,0,0,0)" class="close J-clickPoint feedback" shape="rect" coords="568,28,596,54"   data-clickData-points="point=11194.11720.31506.31509&_fm=7178"></map></div>';
                $html = $(html);
                $("body").append($html);bindListener($html);
                                Tatami.pub('Tatami.clickPoint.manualTrigger',{
                    point: '11194.11720.31506.31507',
                    _fm: '7176'
                });
                            };
                            return Impl;
                        };
                        advertisement = new Advertisement();
                        advertisement.show();
                    }())
            }
        }
    });
}(window));
 </script>