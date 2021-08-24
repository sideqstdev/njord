import { IsNumber, Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType(`pagination_input`)
export class paginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 15 })
  @IsNumber()
  @Min(1)
  @Max(50)
  take: number = 15;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Min(0)
  skip: number = 0;
}
