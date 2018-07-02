export interface AddRequestResponseType {
  success: boolean;
  error: string;
  request_id: number;
}

export interface BossResponseType {
  success: boolean;
  error: string;
  boss: number;
}

export interface MenuItem {
  name: string;
  short_name: string;
  sub_menu: string[][];
}

export interface MySurveyType {
  id_survey: number;
}

export interface MySurveysResponseType {
  success: boolean;
  error: string;
  surveys: MySurveyType[];
}

export interface LogResponseType {
  success: boolean;
  error: string;
  user: UserType;
  token: string;
}

export interface QuestionsResponseType {
  success: boolean;
  error: string;
  questions: QuestionsType[];
}

export interface QuestionsType {
  id: number;
  question: string;
  answer: string;
  type: string;
  step: number;
  condition_answer: boolean;
  id_survey: number;
}

export interface RegisterResponseType {
  success: boolean;
  error: string;
}

export interface RequestsResponseType {
  success: boolean;
  error: string;
  requests: RequestType[];
}

export interface RequestType {
  id: number;
  id_user: number;
  state: number;
  reason: string;
  justification_file: string;
  start_date: Date;
  end_date: Date;
}

export interface SuccessResponseType {
  success: boolean;
  error: string;
}

export interface SurveyCreationResponseType {
  success: boolean;
  error: string;
  survey: number;
}

export interface SurveyType {
  id: number;
  name: string;
  id_user: number;
}

export interface SurveysResponseType {
  success: boolean;
  error: string;
  surveys: SurveyType[];
}

export interface SupervisionsResponseType {
  success: boolean;
  error: string;
  supervisions: SupervisionType[];
}

export interface SupervisionType {
  id_user: number;
  id_boss: number;
}

export interface UserResponseType {
  success: boolean;
  error: string;
  user: UserType;
}

export interface UsersResponseType {
  success: boolean;
  error: string;
  users: UserType[];
}

export interface UserType {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface TableUserType {
  position: number;
  name: string;
  surname: string;
  email: string;
}

export interface VersionResponseType {
  success: boolean;
  error: string;
  version: string;
}
