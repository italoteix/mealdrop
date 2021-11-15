import { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { expect } from '@storybook/jest'
import { within, userEvent, waitForElementToBeRemoved } from '@storybook/testing-library'

import { BASE_URL } from '../api'
import { restaurants } from '../stub/restaurants'
import { animatedUserEventClick } from '../../.storybook/interaction'

export default {
  title: 'UserFlows/App',
  parameters: {
    layout: 'fullscreen',
    deeplink: { route: '/', path: '/' },
    msw: [
      rest.get(BASE_URL, (req, res, ctx) => {
        const id = req.url.searchParams.get('id')
        const category = req.url.searchParams.get('category')

        console.log({ id, category })
        if (id) {
          return res(ctx.json(restaurants[0]))
        }

        if (category) {
          return res(ctx.json([restaurants[0], restaurants[1], restaurants[2]]))
        }

        return res(ctx.json(restaurants))
      }),
    ],
  },
  argTypes: {
    demoMode: {
      control: { type: 'boolean' },
    },
  },
} as Meta

export const Home = {}

export const ToCategoryListPage: StoryObj = {
  play: async ({ canvasElement, args }) => {
    const clickEvent = args.demoMode === true ? animatedUserEventClick : userEvent.click
    const canvas = within(canvasElement)

    await clickEvent(canvas.getByText('View all restaurants'))
  },
}

export const ToCategoryDetailPage: StoryObj = {
  play: async (context) => {
    await ToCategoryListPage.play!(context)
    const { canvasElement, args } = context

    const clickEvent = args.demoMode === true ? animatedUserEventClick : userEvent.click
    const canvas = within(canvasElement)

    await clickEvent(canvas.getByTestId('Burgers'))
  },
}

export const ToRestaurantDetailPage: StoryObj = {
  play: async (context) => {
    await ToCategoryDetailPage.play!(context)
    const { canvasElement, args } = context

    const clickEvent = args.demoMode === true ? animatedUserEventClick : userEvent.click
    const canvas = within(canvasElement)

    await waitForElementToBeRemoved(await canvas.findAllByTestId('loading'))
    await clickEvent(canvas.getAllByTestId('restaurant-card')[0])
  },
}

export const ToCheckoutPage: StoryObj = {
  play: async (context) => {
    await ToRestaurantDetailPage.play!(context)
    const { canvasElement, args } = context

    const clickEvent = args.demoMode === true ? animatedUserEventClick : userEvent.click
    const canvas = within(canvasElement)

    await waitForElementToBeRemoved(await canvas.findByText('Looking for some food...'))

    const foodItem = await canvas.findByText(/Cheeseburger/i)
    await clickEvent(foodItem)

    const modalButton = await canvas.findByLabelText('increase quantity by one')
    await clickEvent(modalButton)
    await clickEvent(canvas.getByLabelText('confirm'))

    const cheeseburgerItem = within(foodItem.parentElement!)

    await expect(cheeseburgerItem.getByLabelText('food quantity').textContent).toEqual('2')

    await clickEvent(canvas.getByLabelText('food cart'))
    const sidebar = await within(canvasElement).findByTestId('sidebar')

    const foodItemSelector: HTMLSelectElement = within(sidebar).getByRole('combobox')
    await expect(foodItemSelector.value).toEqual('2')

    await clickEvent(canvas.getByText(/checkout/i))
  },
}

export const ToSuccessPage: StoryObj = {
  play: async (context) => {
    await ToCheckoutPage.play!(context)
    const { canvasElement, args } = context

    const clickEvent = args.demoMode === true ? animatedUserEventClick : userEvent.click
    const canvas = within(canvasElement)

    await clickEvent(canvas.getByText(/Next/i))
    await clickEvent(canvas.getByText(/Complete/i))
  },
}

export const EndToEnd: StoryObj = {
  args: {
    demoMode: true,
  },
  play: async (context) => {
    await ToSuccessPage.play!(context)
  },
}
