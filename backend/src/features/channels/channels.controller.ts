import { Request, Response } from 'express';
import { YouTubeAPI } from '../../utils/youtube.util';

export class ChannelsController {
  static async getSubscribedChannels(req: Request, res: Response) {
    try {
      const accessToken = req.user?.accessToken;
      if (!accessToken) return res.status(401).json({ error: 'Unauthorized' });
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const pageToken = req.query.pageToken as string | undefined;

      const params: Record<string, any> = {
        part: 'snippet',
        mine: true,
        maxResults: limit,
      };
      if (pageToken) params.pageToken = pageToken;

      const data = await YouTubeAPI.get('https://www.googleapis.com/youtube/v3/subscriptions', accessToken, params);
      const items = data.items.map((item: any) => ({
        channelId: item.snippet.resourceId.channelId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.default?.url || '',
      }));
      res.json({
        totalPages: Math.ceil((data.pageInfo?.totalResults || items.length) / limit),
        currentPage: page,
        nextPageToken: data.nextPageToken,
        prevPageToken: data.prevPageToken,
        items,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch subscriptions' });
    }
  }

  static async addChannels(req: Request, res: Response) {
    // TODO: Add channels to user list
  }

  static async removeChannel(req: Request, res: Response) {
    // TODO: Remove a channel from user list
  }
} 