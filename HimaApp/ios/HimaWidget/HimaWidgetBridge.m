//
//  HimaWidgetModule.m
//  HimaApp
//
//  Created by 相原光志 on 2024/04/24.
//

#import <Foundation/Foundation.h>
// TimerWidgetBridge.m

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HimaWidgetModule, NSObject)

+ (bool)requiresMainQueueSetup {
  return NO;
}

RCT_EXTERN_METHOD(startLiveActivity)
RCT_EXTERN_METHOD(stopLiveActivity)

@end
