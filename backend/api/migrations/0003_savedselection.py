# Generated by Django 5.0.6 on 2024-06-17 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20240616_0218'),
    ]

    operations = [
        migrations.CreateModel(
            name='SavedSelection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('saved_view', models.JSONField()),
            ],
            options={
                'verbose_name': 'SavedSelection',
                'verbose_name_plural': 'SavedSelections',
            },
        ),
    ]
