// HimaWidgetLiveActivity.swift

import ActivityKit
import WidgetKit
import SwiftUI

struct HimaWidgetAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var startedAt: Date?

    // This will be useful later on to calculate the bridge time (since the timer will be started from JS land)
    func getTimeIntervalSinceNow() -> Double {
      guard let startedAt = self.startedAt else {
        return 0
      }
      return startedAt.timeIntervalSince1970 - Date().timeIntervalSince1970
    }
  }
}

struct HimaWidgetLiveActivity: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: HimaWidgetAttributes.self) { context in
      // Lock screen/banner UI goes here
      VStack {
        Text(
          Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
          style: .timer
        )
        .font(.title)
        .fontWeight(.medium)
        .monospacedDigit()
      }
      .activityBackgroundTint(Color.cyan)
      .activitySystemActionForegroundColor(Color.black)
    } dynamicIsland: { context in
      DynamicIsland {
        // Expanded Region
        DynamicIslandExpandedRegion(.center) {
          Text(
            Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
            style: .timer
          )
          .font(.title)
          .foregroundColor(.cyan)
          .fontWeight(.medium)
          .monospacedDigit()
        }
      } compactLeading: {
        Image(systemName: "timer")
          .imageScale(.medium)
          .foregroundColor(.cyan)
      } compactTrailing: {
        // Text(
        //   Date(timeIntervalSinceNow: context.state.getTimeIntervalSinceNow()),
        //   style: .timer
        // )
        // .foregroundColor(.cyan)
        // .frame(maxWidth: 32)
        // .monospacedDigit()
        ProgressView(value: 0.5, total: 1) {
          let healthLevel = Int(0.5 * 100)
                    Text("\(healthLevel)")
                        .accessibilityLabel("Health level at \(healthLevel) percent.")
                }
                .progressViewStyle(.circular)
                .tint(0.5 <= 0.2 ? Color.red : Color.green)
      } minimal: {
        Image(systemName: "timer")
          .imageScale(.medium)
          .foregroundColor(.cyan)
      }
      .widgetURL(URL(string: "http://www.apple.com"))
      .keylineTint(Color.red)
    }
  }
}

// Copy the below at the end of your file
// extension HimaWidgetAttributes {
//   fileprivate static var preview: HimaWidgetAttributes {
//     HimaWidgetAttributes()
//   }
// }

// extension HimaWidgetAttributes.ContentState {
//   fileprivate static var initState: HimaWidgetAttributes.ContentState {
//     HimaWidgetAttributes.ContentState(startedAt: Date())
//   }
// }

// #Preview("Notification", as: .content, using: HimaWidgetAttributes.preview) {
//   HimaWidgetLiveActivity()
// } contentStates: {
//   HimaWidgetAttributes.ContentState.initState
// }
