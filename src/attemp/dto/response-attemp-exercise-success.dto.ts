import { Expose } from 'class-transformer'

export class ResponseAttempExerciseSuccessDto {
  @Expose()
  exerciseId!: number

  @Expose()
  title?: string

  @Expose()
  correct!: number

  @Expose()
  incorrect!: number

  @Expose()
  total!: number

  @Expose()
  successRate!: number
}
