
export interface GameUser {
  id: string;
  name: string;
}

export interface GameRoomOption {
  id: string;
  value: boolean | string | number;
}

export interface GameRoom {
  id?: string;
  name?: string;
  options?: GameRoomOption[];
}