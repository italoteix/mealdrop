import styled, { css } from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavigationProps } from 'react-hooks-helper'

import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/forms/Input'
import { Body } from '../../../../components/typography/Body'

import { FormData } from './MultiStepForm'

interface Inputs {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface ContactDetailsProps {
  setForm: (stepData: Partial<FormData>) => void
  formData: FormData
  navigation: NavigationProps
}

const DisclaimerText = styled(Body)(
  ({ theme: { spacing } }) => css`
    margin-bottom: ${spacing.m};
  `
)

export const ContactDetails = ({ setForm, formData, navigation }: ContactDetailsProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: formData })

  const { next } = navigation

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setForm(data)
    next()
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Input label="First Name" placeholder="John" {...register('firstName')} />
      <Input label="Last Name" placeholder="Doe" {...register('lastName')} />
      <Input label="Email" type="email" placeholder="email address" {...register('email')} />
      <Input label="Phone number" placeholder="phone number" type="tel" {...register('phone')} />
      <DisclaimerText size="XXS" type="span">
        We’ll only use your phone to call you about your order
      </DisclaimerText>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button onClick={next}>Next</Button>
      </div>
    </form>
  )
}
