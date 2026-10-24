export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Deadline not verified — check official source';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function isDeadlineExpired(dateString: string | null): boolean {
  if (!dateString) return false;
  try {
    const deadline = new Date(dateString).getTime();
    const today = new Date().getTime();
    return deadline < today;
  } catch {
    return false;
  }
}

export function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );
  } else {
    // Fallback for older browsers or non-secure contexts
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return Promise.resolve(successful);
    } catch {
      return Promise.resolve(false);
    }
  }
}
