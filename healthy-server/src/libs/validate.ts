import Joi from 'joi'
import { ErrorStat } from './stats'

/**
 * 参数合法性校验
 * @param data
 * @param schema
 * @returns
 */
export default function validate(data: any, schema: Joi.ObjectSchema) {
  const { value, error } = schema.validate(data, {
    stripUnknown: true
  })
  if (error) {
    throw new ErrorStat(10001, error.message)
  }
  return value
}
