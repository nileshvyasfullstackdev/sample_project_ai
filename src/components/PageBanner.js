import { Container } from 'react-bootstrap';

export default function PageBanner({ title, subtitle, variant = 'primary' }) {
  const bgClass = variant === 'primary' ? 'bg-primary text-white' : 'bg-light text-dark';
  
  return (
    <div className={`${bgClass} py-5 w-100`}>
      <Container>
        <h1 className="mb-2">{title}</h1>
        {subtitle && <p className={variant === 'primary' ? 'mb-0' : 'text-muted mb-0'}>{subtitle}</p>}
      </Container>
    </div>
  );
}
