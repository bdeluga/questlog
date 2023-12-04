export default function getFormData(
  currentTarget: EventTarget & HTMLFormElement
) {
  return Object.fromEntries(new FormData(currentTarget));
}
