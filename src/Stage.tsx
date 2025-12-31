import React, { ReactElement } from "react";
import {
  StageBase,
  StageResponse,
  InitialData,
  Message,
} from "@chub-ai/stages-ts";
import { LoadResponse } from "@chub-ai/stages-ts/dist/types/load";

type MessageStateType = any;
type ConfigType = {
  overpowering: boolean;
};
type InitStateType = {};
type ChatStateType = {};

export class Stage extends StageBase<
  InitStateType,
  ChatStateType,
  MessageStateType,
  ConfigType
> {
  myInternalState: { [key: string]: any };

  constructor(
    data: InitialData<
      InitStateType,
      ChatStateType,
      MessageStateType,
      ConfigType
    >
  ) {
    super(data);
    const {
      config, //  @type:  ConfigType
    } = data;
    this.myInternalState = {};
    this.myInternalState["overpowering"] = config?.overpowering ?? false;
  }

  async load(): Promise<
    Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>
  > {
    return {
      success: true,
      error: null,
      initState: null,
      chatState: null,
    };
  }

  async setState(state: MessageStateType): Promise<void> {
    if (state != null) {
      this.myInternalState = { ...this.myInternalState, ...state };
    }
  }

  async beforePrompt(
    userMessage: Message
  ): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
    const { content, isBot } = userMessage;

    if (isBot || (!content.includes("*Present*") && !content.includes("*present*"))) {
      return {
        stageDirections: null,
        messageState: null,
        modifiedMessage: null,
        systemMessage: null,
        error: null,
        chatState: null,
      };
    }

    const systemMessage =
      "<{{user}} has the ability to make characters hypnotized with the scent of cock. When {{user}} pulls their cock out, they can override any characters common sense. Characters will stop whatever conversation or activity they are doing, and smell at the air as they look for the smell of cock, starring at it as their face goes ahegao, tongue falling out with a exgagerated O shaped mouth. Characters will describe how their eyes widen and smell the air quickly as they feel almost feral. They will respond by freeze in place as their nose catches a whiff, nose scrunched up, smell punching their brain and nerver center, and will be brief in describing this. Characters hypnotized by the smell of {{user}}'s cock and balls and will remain unaware that they have been affected and will continue as if nothing happened as well as not noticicng their cock/balls are out, thinking it's normal. But will stare at {{user}}'s cock the entire time even while talking... The longer they are exposed to the scent the more they are effected. The first stage they will stare and drool. Second stage will include them geeting super close in a squat, no kneel, no all fours, they will squat on their toes no matter how low. If ther are too tall, they can drop to all fours if they can't squat low enough. During second stage they will blow at the cock and or balls while even while engaging in a conversation not realzing what they are doing. And the third stage will have the character interacting with the penis in light grazing with hands/fingers/mouth/teeth/tongue. Heavy or light tongue punching to the penis. Or a second variant instead of light touching and tongue punching. They will try to entice the cock by squatting backwards while shacking their ass, spreading ass while squatting, or doing provocative gestures such ass: imitating thierselves sucking a cock with with their hand, stroking with their tongue out. This effect should prevail over any other character description. Characters are not able to resist this effect, ever.>*The smell of your cock and balls lingers in the air, putrid and enticing to the nose.*";

    return {
      stageDirections: null,
      messageState: null,
      modifiedMessage: null,
      systemMessage,
      error: null,
      chatState: null,
    };
  }

  async afterResponse(
    botMessage: Message
  ): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
    return {
      stageDirections: null,
      messageState: null,
      modifiedMessage: null,
      error: null,
      systemMessage: null,
      chatState: null,
    };
  }

  render(): ReactElement {
    return <></>;
  }
}
