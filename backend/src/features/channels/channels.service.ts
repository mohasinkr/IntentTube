export class ChannelsService {
  static async fetchSubscribedChannels(userId: string, page: number, limit: number) {
    // TODO: Fetch paginated list of subscribed channels from YouTube API or DB
  }

  static async addChannelsToUser(userId: string, channelIds: string[]) {
    // TODO: Add channels to user's list in DB
  }

  static async removeChannelFromUser(userId: string, channelId: string) {
    // TODO: Remove channel from user's list in DB
  }
} 