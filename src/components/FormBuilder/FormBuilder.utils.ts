import { FieldLayout, FormState } from 'models/form.model';
import { FieldGroup, FormBuilderProps } from './FormBuilder.model';

export const buildInitialState = (layout: FormBuilderProps['formLayout'], defaultValues: FormState | null | undefined): FormState =>
  layout.reduce<FormState>((acc, field) => {
    acc[field.name] = defaultValues?.[field.name] ?? { value: '', error: false };
    return acc;
  }, {});

export const getGroupFields = (layout: FieldLayout[]): FieldGroup[] => {
  const groups: FieldGroup[] = [];
  const gridMap = new Map<string, FieldLayout[]>();

  for (const field of layout) {
    if (field.gridGroup) {
      if (!gridMap.has(field.gridGroup)) {
        const fields: FieldLayout[] = [];
        gridMap.set(field.gridGroup, fields);
        groups.push({ kind: 'grid', groupId: field.gridGroup, fields });
      }
      gridMap.get(field.gridGroup)!.push(field);
    } else {
      groups.push({ kind: 'single', field });
    }
  }

  return groups;
};
