export type AcknowledgementMap = {
  [id: string]: Acknowledgement;
};

export type AcknowledgementType = "AUTO" | "MANUAL";

export interface Acknowledgement {
  id: string;
  type: AcknowledgementType;
  created_at: string;
}

export type Modify<T, R> = Omit<T, keyof R> & R;
