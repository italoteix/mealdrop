import React from 'react'
import styled, { css } from 'styled-components'

import { Body } from './typography/Body'

const Container = styled.div(
  ({ theme: { color } }) => css`
    padding: 3px 8px;
    background: ${color.badgeBackground};
    border-radius: 4px;
    display: inline-block;
    span {
      color: ${color.badgeText};
    }
  `
)

export type BadgeProps = {
  text: string
}

export const Badge = ({ text }: BadgeProps) => (
  <Container>
    <Body type="span" size="S">
      {text}
    </Body>
  </Container>
)