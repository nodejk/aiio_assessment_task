api_src = api
core_src = core
all_src = $(core_src) $(api_src)

test = poetry run python -m unittest discover -s ./tests -p '*Test.py' -v
autoflake = poetry run autoflake -r --in-place --remove-all-unused-imports --remove-unused-variables --ignore-init-module-imports $(all_src)
mypy_base = poetry run mypy --show-error-codes
mypy = $(mypy_base) $(all_src)
isort = poetry run isort $(all_src)
black = poetry run black $(all_src)


.PHONY: all
all: static test

.PHONY: static
static: mypy

.PHONY: test
test:
	$(test)

.PHONY: mypy
mypy:
	$(mypy)

.PHONY: check-format
check-format:
	$(autoflake) --check
	$(black) --check

.PHONY: format
format:
	$(autoflake)
	$(isort)
	$(black)

.PHONY: clean
clean:
	rm -f `find . -type f -name '*.py[co]' `
	rm -f `find . -type f -name '*~' `
	rm -f `find . -type f -name '.*~' `
	rm -f `find . -type f -name .coverage`
	rm -f `find . -type f -name ".coverage.*"`
	rm -rf `find . -name __pycache__`
	rm -rf `find . -type d -name '*.egg-info' `
	rm -rf `find . -type d -name 'pip-wheel-metadata' `
	rm -rf `find . -type d -name .pytest_cache`
	rm -rf `find . -type d -name .cache`
	rm -rf `find . -type d -name .mypy_cache`
	rm -rf `find . -type d -name htmlcov`
	rm -rf `find . -type d -name "*.egg-info"`
	rm -rf `find . -type d -name build`
	rm -rf `find . -type d -name dist`
