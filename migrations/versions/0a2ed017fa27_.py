"""empty message

Revision ID: 0a2ed017fa27
Revises: 
Create Date: 2025-02-17 22:49:35.169390

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0a2ed017fa27'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('keywords',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('skills',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('skill_keyword',
    sa.Column('skill_id', sa.Integer(), nullable=False),
    sa.Column('keyword_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['keyword_id'], ['keywords.id'], ),
    sa.ForeignKeyConstraint(['skill_id'], ['skills.id'], ),
    sa.PrimaryKeyConstraint('skill_id', 'keyword_id')
    )
    op.create_table('skill_relationship',
    sa.Column('parent_skill_id', sa.Integer(), nullable=False),
    sa.Column('child_skill_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['child_skill_id'], ['skills.id'], ),
    sa.ForeignKeyConstraint(['parent_skill_id'], ['skills.id'], ),
    sa.PrimaryKeyConstraint('parent_skill_id', 'child_skill_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('skill_relationship')
    op.drop_table('skill_keyword')
    op.drop_table('skills')
    op.drop_table('keywords')
    # ### end Alembic commands ###
