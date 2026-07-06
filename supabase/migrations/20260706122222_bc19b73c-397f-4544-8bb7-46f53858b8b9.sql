
UPDATE why_us_cards SET description = REPLACE(description, '180°C', '150°C') WHERE description ILIKE '%180°C%';
UPDATE why_us_cards SET description = 'Visite gratuite, prix tenus, aucune mauvaise surprise.' WHERE title = 'Devis détaillé' AND description ILIKE '%48%';
UPDATE site_content_fields SET content_value = REPLACE(content_value, '180°C', '150°C') WHERE content_value ILIKE '%180°C%';
