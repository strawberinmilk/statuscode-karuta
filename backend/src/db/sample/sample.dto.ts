import { IsNotEmpty, IsString } from 'class-validator';
export class BaseSampleDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateSampleDto extends BaseSampleDto {}

// export class UpdateSampleDto extends BaseSampleDto {
//   @IsNotEmpty()
//   id: number;
// }
