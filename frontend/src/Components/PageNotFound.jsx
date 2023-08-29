import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import NotFound from '../img/NotFound.svg';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img className="img-fluid h-25" src={NotFound} alt={t('notFound.header')} />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        <Link to={routes.chatPagePath()}>{t('notFound.linkText')}</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
