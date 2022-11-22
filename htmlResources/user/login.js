Vue.config.productionTip=false;
var app2=new Vue({
    el:'#root',
    data:{
        src_kind:'userID',
        src_data:'',
        password:''
    },
    computed:{

    },
    methods: {
        login(){
            if(this.src_data!=''&&this.password!=''){
                var xmlhttp;
                var message_string;
                if(this.src_kind=="name")
                    message_string="name=";
                else if(this.src_kind=="email")
                    message_string="email=";
                else 
                    message_string="userID=";
                if (window.XMLHttpRequest)
                  xmlhttp=new XMLHttpRequest();
                else
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                xmlhttp.onreadystatechange=function()
                {
                    if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                        console.log(xmlhttp.responseText);
                        response_json=JSON.parse(xmlhttp.responseText);
                        if(response_json.status){//login失败==1
                            alert(response_json.message);
                        }
                        else{//login成功！
                            localStorage.setItem("token", response_json.token);
                            alert(response_json.message+"即将转跳到首页");
                            window.location.href="../main/index.html"
                        }
                    }
                }
                xmlhttp.open("POST","/api/login",true);
                xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlhttp.send(message_string+app2.src_data+"&password="+app2.password);
            }
            else{
                alert("请输入账号信息和密码！")
            }
        }
    },
    watch:{
    }
})