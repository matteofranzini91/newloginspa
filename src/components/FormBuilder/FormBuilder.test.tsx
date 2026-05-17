import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import '#Config/i18n/i18n';
import { theme } from '#Config/theme';
import type { FieldLayout, FormState } from '#Models/form.model';

import FormBuilder from './FormBuilder';

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
    </ThemeProvider>,
  );

describe('FormBuilder', () => {
  const layout: FieldLayout[] = [
    { type: 'email', label: 'fields.email', name: 'email' },
    { type: 'password', label: 'fields.password', name: 'password' },
  ];

  it('renders fields according to layout', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(
      <FormBuilder formLayout={layout} submitButtonTextKey="auth.login.submitButton" loadingSubmitButton={false} handleSubmit={handleSubmit} />,
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /acceder|login/i })).toBeInTheDocument();
  });

  it('shows CircularProgress when loadingSubmitButton is true', () => {
    renderWithProviders(
      <FormBuilder formLayout={layout} submitButtonTextKey="auth.login.submitButton" loadingSubmitButton={true} handleSubmit={vi.fn()} />,
    );
    expect(screen.queryByRole('button', { name: /acceder|login/i })).not.toBeInTheDocument();
    expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
  });

  it('calls handleSubmit with current form state on submit', () => {
    const handleSubmit = vi.fn();
    renderWithProviders(
      <FormBuilder formLayout={layout} submitButtonTextKey="auth.login.submitButton" loadingSubmitButton={false} handleSubmit={handleSubmit} />,
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { name: 'email', value: 'test@test.com' },
    });
    fireEvent.submit(document.querySelector('form')!);

    expect(handleSubmit).toHaveBeenCalledOnce();
    const callArg: FormState = handleSubmit.mock.calls[0][0];
    expect(callArg['email'].value).toBe('test@test.com');
  });

  it('pre-fills fields from defaultValues', () => {
    const defaultValues: FormState = {
      email: { value: 'prefilled@test.com', error: false },
      password: { value: 'secret', error: false },
    };
    renderWithProviders(
      <FormBuilder
        formLayout={layout}
        submitButtonTextKey="user.edit.saveButton"
        loadingSubmitButton={false}
        handleSubmit={vi.fn()}
        defaultValues={defaultValues}
      />,
    );
    expect((screen.getByLabelText(/Email/i) as HTMLInputElement).value).toBe('prefilled@test.com');
  });
});
