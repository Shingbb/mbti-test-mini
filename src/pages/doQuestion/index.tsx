import {View} from "@tarojs/components";
import {AtButton, AtRadio} from "taro-ui";
import {useEffect, useState} from "react";
import Taro from "@tarojs/taro";
import GlobalFooter from "../../componenets/GlobalFooter";
import questions from "../../data/question.json";

/**
 * 答题页面
 *
 * 页面中包含了题目显示、选项选择、答题进度控制等功能。
 * 用户可以在页面上逐题回答问题，完成后可以查看答案。
 */
export default () => {
  // 当前题目序号，初始化为1，表示从第一题开始
  const [current, setCurrent] = useState<number>(1);

  // 当前题目的数据
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  // 将当前题目的选项转换为AtRadio组件需要的格式
  const questionOptions = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}.${option.value}`,
      value: option.key,
    };
  });

  // 当前题目的答案，用户选择后会存储在这个变量中
  const [currentAnswer, setCurrentAnswer] = useState<string>();

  // 存储用户已经回答的题目答案，用于最后的答案检查
  const [answerList] = useState<string[]>([]);

  // 序号变化时，切换当前题目和当前回答
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  // 返回答题页面的UI结构
  return (
    <View className="doQuestionPage">

      <view className="at-article__h2  title">
        {current}、{currentQuestion.title}
      </view>
      <view className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            //记录回答
            answerList[current - 1] = value;
          }}
        />
      </view>
      {current < questions.length && (
        <AtButton
          type="primary"
          circle
          disabled={!currentAnswer}
          className="controlBtn"
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}
      {current == questions.length && (
        <AtButton
          type="primary"
          circle
          className="controlBtn"
          disabled={!currentAnswer}
          onClick={() => {
            // 传递答案
            Taro.setStorageSync("answerList", answerList);
            //跳转到结果页面
            Taro.navigateTo({url: "/pages/result/index"});
          }}
        >
          查看结果
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          circle
          className="controlBtn"
          onClick={() => setCurrent(current - 1)}
        >
          上一题
        </AtButton>
      )}
      <GlobalFooter />
    </View>
  );
};

