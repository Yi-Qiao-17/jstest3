$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;
    //當按鈕按下後，要做的事情
    $("#startButton").on("click",function(){
        //還沒做題
        if(currentQuiz==null){
            currentQuiz=0;//設定目前作答從第0題開始
            $('#question').text(questions[0].question);//顯示題目
            $('#options').empty();//將選項區清空
            questions[0].answers.forEach(function(element,index,array){
                $('#options').append(
                    `<input name='options' type='radio' value='${index}'> 
                    <label>${element[0]}</label>
                    <br><br>`);
            });//將選項逐個加入
            
            
           $('#startButton').attr("value","Next")//將按鈕上的文字換成Next
        }else{//已經有作答
            //尋訪哪個選項有被選取
            $.each($(":radio"),function(i/*index*/,val/*value*/){
                if(val.checked){
                    //是否已經走到要產生結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1])){//isNaN() 函數:判斷是否是非數值
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");
                    }else{
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;//指定下一題，原始資料從1開始所以要-1

                        $("#question").text(questions[currentQuiz].question);//顯示新的題目
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`
                            <input name='options' type='radio' value='${index}'>
                            <label>${element[0]}</label>
                            <br><br>`);
                        });
                    }
                    return false;
                }
            });
        }
    });
});
