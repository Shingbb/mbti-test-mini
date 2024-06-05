import {Image, View} from "@tarojs/components";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入

import "./index.scss";
import GlobalFooter from "../../componenets/GlobalFooter";
import HeaderBg from "../../assets/images/MbtiBg.jpg";
import questions from "../../data/question.json";
import resultList from "../../data/question_results.json";
import {getBastQuestionResult} from "../../utils/bizUtils";

/**
 * 查看结果页面
 */
export default () => {
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length === 0) {
    Taro.showToast({
      title: "答案为空",
      icon: "error",
      duration: 3000,
    });
  }
  const result = getBastQuestionResult(answerList, questions, resultList);

  return (
    <View className="resultPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h3 subTitle">{result.resultDesc}</View>
      <AtButton
        type="primary"
        size="normal"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>
      <Image src={HeaderBg} style={{width: "100%"}} mode="aspectFill" />
      <GlobalFooter />
    </View>
  );
};
