import { useDispatch, useSelector } from 'react-redux'
import type { RootState, ApiDispatch } from './store'

export const useAppDispatch = useDispatch.withTypes<ApiDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()