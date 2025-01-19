#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager

RCT_EXPORT_MODULE(CalendarManager)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_METHOD(addProductReminder:(NSString *)title
                  description:(NSString *)description
                  date:(NSDate *)date
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    EKEventStore *eventStore = [[EKEventStore alloc] init];

    [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
        if (granted) {
            EKEvent *event = [EKEvent eventWithEventStore:eventStore];
            event.title = title;
            event.notes = description;
            event.startDate = date;
            event.endDate = [date dateByAddingTimeInterval:3600]; // 1 hour duration
            event.calendar = [eventStore defaultCalendarForNewEvents];

            NSError *saveError = nil;
            BOOL success = [eventStore saveEvent:event span:EKSpanThisEvent error:&saveError];

            if (success) {
                resolve(@"Event added successfully");
            } else {
                reject(@"event_error", @"Failed to save event", saveError);
            }
        } else {
            reject(@"calendar_permission", @"Calendar permission not granted", error);
        }
    }];
}

@end
