

export interface Post {
    _id: string;
    caption: string;
    description: string;
    pdf?: {
      public_id: string;
      url: string;
    } | null;
    owner: string;
    to?: string | null;
    likes: [];
    saved: []
    comments: { user: string; Comment: string }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface Data {
    posts: Post[];
  }
  