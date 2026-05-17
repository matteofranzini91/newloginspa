# Redux Toolkit Skill

## Overview

Redux Toolkit (RTK) is the standard and recommended way to write Redux logic. It was created to address three common concerns:

1. "Configuring a Redux store is too complicated"
2. "I have to add a lot of packages to get Redux to do anything useful"
3. "Redux requires too much boilerplate code"

**Official documentation**: https://redux-toolkit.js.org/

## Installation

```bash
npm install @reduxjs/toolkit react-redux
```

For TypeScript, RTK supports TypeScript 5.4+ in version 2.x.

## Core APIs

### configureStore

Creates the Redux store with simplified configuration:

```typescript
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Features**:
- Automatically combines slices
- Adds redux-thunk by default
- Enables Redux DevTools Extension
- Development validations (state mutations, serialization)

### createSlice

Creates a state slice with automatic action creators:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

**Features**:
- Uses **Immer** internally - allows "mutating" code that becomes immutable updates
- Generates action types like `counter/increment`
- Supports `extraReducers` with builder callback
- Supports built-in `selectors`

**Customize action creators with prepare**:

```typescript
reducers: {
  addTodo: {
    reducer: (state, action: PayloadAction<Item>) => {
      state.todos.push(action.payload)
    },
    prepare: (text: string) => {
      const id = nanoid()
      return { payload: { id, text } }
    },
  },
}
```

### createAsyncThunk

Handling asynchronous operations:

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await userAPI.fetchById(userId)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.entities.push(action.payload)
        state.loading = 'succeeded'
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload
        state.loading = 'failed'
      })
  },
})
```

**Lifecycle actions**: pending, fulfilled, rejected

**Unwrapping results**:

```typescript
// With async/await
try {
  const user = await dispatch(fetchUserById(id)).unwrap()
} catch (error) {
  // handle error
}

// With .then
dispatch(fetchUserById(id))
  .unwrap()
  .then((result) => {})
  .catch((error) => {})
```

**Cancellation**:

```typescript
// Before execution
const fetchUser = createAsyncThunk(
  'users/fetch',
  async (id) => {},
  {
    condition: (id, { getState }) => {
      const { users } = getState()
      if (users.cache[id]) return false
    },
  }
)

// While running
const promise = dispatch(fetchUser(id))
promise.abort()
```

### createAction

Generates action creators:

```typescript
import { createAction } from '@reduxjs/toolkit'

const increment = createAction<number>('counter/increment')
// Action: { type: 'counter/increment', payload: number }
```

### createReducer

Reducer with simplified switch statements:

```typescript
import { createReducer } from '@reduxjs/toolkit'

const counterReducer = createReducer(0, (builder) => {
  builder
    .addCase(increment, (state, action) => state + action.payload)
    .addCase(decrement, (state, action) => state - action.payload)
    .addMatcher(action => action.type.startsWith('counter/'), (state) => {})
    .addDefaultCase((state) => {})
})
```

### createEntityAdapter

Managing normalized collections:

```typescript
import { createEntityAdapter } from '@reduxjs/toolkit'

const usersAdapter = createEntityAdapter<User>()

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    userAdded: usersAdapter.addOne,
    usersAdded: usersAdapter.addMany,
    userRemoved: usersAdapter.removeOne,
    usersRemoved: usersAdapter.removeAll,
    userUpdated: usersAdapter.updateOne,
  },
})

// Pre-built selectors
const { selectAll, selectById, selectIds } = usersAdapter.getSelectors()
```

### createSelector

Selector memoization (from Reselect):

```typescript
import { createSelector } from '@reduxjs/toolkit'

const selectTodos = (state) => state.todos.items

const selectActiveTodos = createSelector(
  [selectTodos, (state) => state.todos.filter],
  (todos, filter) => {
    if (filter === 'active') return todos.filter(t => !t.completed)
    return todos
  }
)
```

### combineSlices

Combining slices with lazy loading:

```typescript
import { combineSlices } from '@reduxjs/toolkit'

const rootReducer = combineSlices(
  counterSlice,
  usersSlice,
  asyncTodosSlice
)
```

## RTK Query

Integrated data fetching and caching system:

### createApi

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonById: build.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery, useGetPokemonByIdQuery } = pokemonApi
```

### Store Configuration

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)
```

### Mutations

```typescript
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    updatePokemon: build.mutation<Pokemon, Partial<Pokemon>>({
      query: ({ id, ...patch }) => ({
        url: `pokemon/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
})

export const { useUpdatePokemonMutation } = pokemonApi
```

### Usage in Components

```typescript
function PokemonCard({ name }: { name: string }) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name)

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage />

  return <div>{data.name}</div>
}
```

### Endpoint Options

```typescript
endpoints: (build) => ({
  getPosts: build.query<Post[], void>({
    query: () => '/posts',
    providesTags: (result) =>
      result
        ? [...result.map(({ id }) => ({ type: 'Posts', id })), 'Posts']
        : ['Posts'],
    providesTags: ['Posts'],
  }),
  addPost: build.mutation<Post, Post>({
    query: (post) => ({ url: '/posts', method: 'POST', body: post }),
    invalidatesTags: ['Posts'],
  }),
  getPost: build.query<Post, number>({
    query: (id) => `/posts/${id}`,
    keepUnusedDataFor: 600,
    transformResponse: (response) => transform(response),
  }),
})
```

### ApiProvider

```typescript
import { ApiProvider } from '@reduxjs/toolkit/query/react'

function App() {
  return (
    <ApiProvider api={pokemonApi}>
      <PokemonList />
    </ApiProvider>
  )
}
```

## React-Redux Hooks

### useSelector

```typescript
const count = useSelector((state: RootState) => state.counter.value)
```

### useDispatch

```typescript
const dispatch = useDispatch()
const increment = () => dispatch(counterSlice.actions.increment())

// With typed TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## Best Practices

### File Structure

```
src/
  app/
    store.ts
    hooks.ts
  features/
    counter/
      counterSlice.ts
      Counter.tsx
  services/
    pokemonApi.ts
```

### TypeScript Types

```typescript
// app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### Avoid Direct Mutations

```typescript
// Incorrect
state.push(newItem)

// Correct (with Immer)
state.items.push(newItem)

// Or without Immer
return { ...state, items: [...state.items, newItem] }
```

### useDispatch with Typed Thunks

```typescript
const dispatch = useAppDispatch()
const result = await dispatch(fetchUser(id))
if (fetchUser.fulfilled.match(result)) {
  console.log(result.payload)
}
```

## Common Errors

1. **Mutations outside of Immer**: Only use mutating code inside createSlice/createReducer reducers
2. **Not adding RTK Query middleware**: Forgetting `pokemonApi.middleware` in the store
3. **Not typing initial state**: Use explicit types for better inference
4. **Forgetting Provider**: Not wrapping the app with react-redux Provider