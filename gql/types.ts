export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
	  }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
	BigFloat: { input: string; output: string }
	BigInt: { input: string; output: string }
	Cursor: { input: any; output: any }
	Date: { input: string; output: string }
	Datetime: { input: string; output: string }
	JSON: { input: string; output: string }
	Opaque: { input: any; output: any }
	Time: { input: string; output: string }
	UUID: { input: string; output: string }
}

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
	eq?: InputMaybe<Scalars["BigFloat"]["input"]>
	gt?: InputMaybe<Scalars["BigFloat"]["input"]>
	gte?: InputMaybe<Scalars["BigFloat"]["input"]>
	in?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["BigFloat"]["input"]>
	lte?: InputMaybe<Scalars["BigFloat"]["input"]>
	neq?: InputMaybe<Scalars["BigFloat"]["input"]>
}

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
	containedBy?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>
	contains?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>
	eq?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["BigFloat"]["input"]>>
}

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
	eq?: InputMaybe<Scalars["BigInt"]["input"]>
	gt?: InputMaybe<Scalars["BigInt"]["input"]>
	gte?: InputMaybe<Scalars["BigInt"]["input"]>
	in?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["BigInt"]["input"]>
	lte?: InputMaybe<Scalars["BigInt"]["input"]>
	neq?: InputMaybe<Scalars["BigInt"]["input"]>
}

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
	containedBy?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
	contains?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
	eq?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["BigInt"]["input"]>>
}

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
	eq?: InputMaybe<Scalars["Boolean"]["input"]>
	is?: InputMaybe<FilterIs>
}

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
	containedBy?: InputMaybe<Array<Scalars["Boolean"]["input"]>>
	contains?: InputMaybe<Array<Scalars["Boolean"]["input"]>>
	eq?: InputMaybe<Array<Scalars["Boolean"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["Boolean"]["input"]>>
}

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
	eq?: InputMaybe<Scalars["Date"]["input"]>
	gt?: InputMaybe<Scalars["Date"]["input"]>
	gte?: InputMaybe<Scalars["Date"]["input"]>
	in?: InputMaybe<Array<Scalars["Date"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["Date"]["input"]>
	lte?: InputMaybe<Scalars["Date"]["input"]>
	neq?: InputMaybe<Scalars["Date"]["input"]>
}

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
	containedBy?: InputMaybe<Array<Scalars["Date"]["input"]>>
	contains?: InputMaybe<Array<Scalars["Date"]["input"]>>
	eq?: InputMaybe<Array<Scalars["Date"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["Date"]["input"]>>
}

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
	eq?: InputMaybe<Scalars["Datetime"]["input"]>
	gt?: InputMaybe<Scalars["Datetime"]["input"]>
	gte?: InputMaybe<Scalars["Datetime"]["input"]>
	in?: InputMaybe<Array<Scalars["Datetime"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["Datetime"]["input"]>
	lte?: InputMaybe<Scalars["Datetime"]["input"]>
	neq?: InputMaybe<Scalars["Datetime"]["input"]>
}

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
	containedBy?: InputMaybe<Array<Scalars["Datetime"]["input"]>>
	contains?: InputMaybe<Array<Scalars["Datetime"]["input"]>>
	eq?: InputMaybe<Array<Scalars["Datetime"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["Datetime"]["input"]>>
}

export type DepotPositions = Node & {
	__typename?: "DepotPositions"
	amount: Scalars["Int"]["output"]
	date: Scalars["Date"]["output"]
	depot_id: Scalars["BigInt"]["output"]
	depots?: Maybe<Depots>
	expenses: Scalars["Float"]["output"]
	id: Scalars["BigInt"]["output"]
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
	profit: Scalars["Float"]["output"]
	stockInfo?: Maybe<StockInfo>
	stock_id: Scalars["BigInt"]["output"]
}

export type DepotPositionsConnection = {
	__typename?: "DepotPositionsConnection"
	edges: Array<DepotPositionsEdge>
	pageInfo: PageInfo
}

export type DepotPositionsDeleteResponse = {
	__typename?: "DepotPositionsDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<DepotPositions>
}

export type DepotPositionsEdge = {
	__typename?: "DepotPositionsEdge"
	cursor: Scalars["String"]["output"]
	node: DepotPositions
}

export type DepotPositionsFilter = {
	amount?: InputMaybe<IntFilter>
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<DepotPositionsFilter>>
	date?: InputMaybe<DateFilter>
	depot_id?: InputMaybe<BigIntFilter>
	expenses?: InputMaybe<FloatFilter>
	id?: InputMaybe<BigIntFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<DepotPositionsFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<DepotPositionsFilter>>
	profit?: InputMaybe<FloatFilter>
	stock_id?: InputMaybe<BigIntFilter>
}

export type DepotPositionsInsertInput = {
	amount?: InputMaybe<Scalars["Int"]["input"]>
	date?: InputMaybe<Scalars["Date"]["input"]>
	depot_id?: InputMaybe<Scalars["BigInt"]["input"]>
	expenses?: InputMaybe<Scalars["Float"]["input"]>
	profit?: InputMaybe<Scalars["Float"]["input"]>
	stock_id?: InputMaybe<Scalars["BigInt"]["input"]>
}

export type DepotPositionsInsertResponse = {
	__typename?: "DepotPositionsInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<DepotPositions>
}

export type DepotPositionsOrderBy = {
	amount?: InputMaybe<OrderByDirection>
	date?: InputMaybe<OrderByDirection>
	depot_id?: InputMaybe<OrderByDirection>
	expenses?: InputMaybe<OrderByDirection>
	id?: InputMaybe<OrderByDirection>
	profit?: InputMaybe<OrderByDirection>
	stock_id?: InputMaybe<OrderByDirection>
}

export type DepotPositionsUpdateInput = {
	amount?: InputMaybe<Scalars["Int"]["input"]>
	date?: InputMaybe<Scalars["Date"]["input"]>
	depot_id?: InputMaybe<Scalars["BigInt"]["input"]>
	expenses?: InputMaybe<Scalars["Float"]["input"]>
	profit?: InputMaybe<Scalars["Float"]["input"]>
	stock_id?: InputMaybe<Scalars["BigInt"]["input"]>
}

export type DepotPositionsUpdateResponse = {
	__typename?: "DepotPositionsUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<DepotPositions>
}

export type DepotValues = Node & {
	__typename?: "DepotValues"
	depot_id: Scalars["BigInt"]["output"]
	depots?: Maybe<Depots>
	id: Scalars["BigInt"]["output"]
	liquid_assets: Scalars["Int"]["output"]
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
	stock_assets: Scalars["Int"]["output"]
	timestamp: Scalars["Date"]["output"]
}

export type DepotValuesConnection = {
	__typename?: "DepotValuesConnection"
	edges: Array<DepotValuesEdge>
	pageInfo: PageInfo
}

export type DepotValuesDeleteResponse = {
	__typename?: "DepotValuesDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<DepotValues>
}

export type DepotValuesEdge = {
	__typename?: "DepotValuesEdge"
	cursor: Scalars["String"]["output"]
	node: DepotValues
}

export type DepotValuesFilter = {
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<DepotValuesFilter>>
	depot_id?: InputMaybe<BigIntFilter>
	id?: InputMaybe<BigIntFilter>
	liquid_assets?: InputMaybe<IntFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<DepotValuesFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<DepotValuesFilter>>
	stock_assets?: InputMaybe<IntFilter>
	timestamp?: InputMaybe<DateFilter>
}

export type DepotValuesInsertInput = {
	depot_id?: InputMaybe<Scalars["BigInt"]["input"]>
	liquid_assets?: InputMaybe<Scalars["Int"]["input"]>
	stock_assets?: InputMaybe<Scalars["Int"]["input"]>
	timestamp?: InputMaybe<Scalars["Date"]["input"]>
}

export type DepotValuesInsertResponse = {
	__typename?: "DepotValuesInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<DepotValues>
}

export type DepotValuesOrderBy = {
	depot_id?: InputMaybe<OrderByDirection>
	id?: InputMaybe<OrderByDirection>
	liquid_assets?: InputMaybe<OrderByDirection>
	stock_assets?: InputMaybe<OrderByDirection>
	timestamp?: InputMaybe<OrderByDirection>
}

export type DepotValuesUpdateInput = {
	depot_id?: InputMaybe<Scalars["BigInt"]["input"]>
	liquid_assets?: InputMaybe<Scalars["Int"]["input"]>
	stock_assets?: InputMaybe<Scalars["Int"]["input"]>
	timestamp?: InputMaybe<Scalars["Date"]["input"]>
}

export type DepotValuesUpdateResponse = {
	__typename?: "DepotValuesUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<DepotValues>
}

export type Depots = Node & {
	__typename?: "Depots"
	created_at: Scalars["Date"]["output"]
	depotPositionsCollection?: Maybe<DepotPositionsConnection>
	depotValuesCollection?: Maybe<DepotValuesConnection>
	id: Scalars["BigInt"]["output"]
	liquid_assets: Scalars["Int"]["output"]
	name?: Maybe<Scalars["String"]["output"]>
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
	profiles?: Maybe<Profiles>
	transactionsCollection?: Maybe<TransactionsConnection>
	user_id: Scalars["UUID"]["output"]
}

export type DepotsDepotPositionsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<DepotPositionsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<DepotPositionsOrderBy>>
}

export type DepotsDepotValuesCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<DepotValuesFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<DepotValuesOrderBy>>
}

export type DepotsTransactionsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<TransactionsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<TransactionsOrderBy>>
}

export type DepotsConnection = {
	__typename?: "DepotsConnection"
	edges: Array<DepotsEdge>
	pageInfo: PageInfo
}

export type DepotsDeleteResponse = {
	__typename?: "DepotsDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Depots>
}

export type DepotsEdge = {
	__typename?: "DepotsEdge"
	cursor: Scalars["String"]["output"]
	node: Depots
}

export type DepotsFilter = {
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<DepotsFilter>>
	created_at?: InputMaybe<DateFilter>
	id?: InputMaybe<BigIntFilter>
	liquid_assets?: InputMaybe<IntFilter>
	name?: InputMaybe<StringFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<DepotsFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<DepotsFilter>>
	user_id?: InputMaybe<UuidFilter>
}

export type DepotsInsertInput = {
	created_at?: InputMaybe<Scalars["Date"]["input"]>
	liquid_assets?: InputMaybe<Scalars["Int"]["input"]>
	name?: InputMaybe<Scalars["String"]["input"]>
	user_id?: InputMaybe<Scalars["UUID"]["input"]>
}

export type DepotsInsertResponse = {
	__typename?: "DepotsInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Depots>
}

export type DepotsOrderBy = {
	created_at?: InputMaybe<OrderByDirection>
	id?: InputMaybe<OrderByDirection>
	liquid_assets?: InputMaybe<OrderByDirection>
	name?: InputMaybe<OrderByDirection>
	user_id?: InputMaybe<OrderByDirection>
}

export type DepotsUpdateInput = {
	created_at?: InputMaybe<Scalars["Date"]["input"]>
	liquid_assets?: InputMaybe<Scalars["Int"]["input"]>
	name?: InputMaybe<Scalars["String"]["input"]>
	user_id?: InputMaybe<Scalars["UUID"]["input"]>
}

export type DepotsUpdateResponse = {
	__typename?: "DepotsUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Depots>
}

export enum FilterIs {
	NotNull = "NOT_NULL",
	Null = "NULL",
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
	eq?: InputMaybe<Scalars["Float"]["input"]>
	gt?: InputMaybe<Scalars["Float"]["input"]>
	gte?: InputMaybe<Scalars["Float"]["input"]>
	in?: InputMaybe<Array<Scalars["Float"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["Float"]["input"]>
	lte?: InputMaybe<Scalars["Float"]["input"]>
	neq?: InputMaybe<Scalars["Float"]["input"]>
}

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
	containedBy?: InputMaybe<Array<Scalars["Float"]["input"]>>
	contains?: InputMaybe<Array<Scalars["Float"]["input"]>>
	eq?: InputMaybe<Array<Scalars["Float"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["Float"]["input"]>>
}

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
	eq?: InputMaybe<Scalars["ID"]["input"]>
}

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
	eq?: InputMaybe<Scalars["Int"]["input"]>
	gt?: InputMaybe<Scalars["Int"]["input"]>
	gte?: InputMaybe<Scalars["Int"]["input"]>
	in?: InputMaybe<Array<Scalars["Int"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["Int"]["input"]>
	lte?: InputMaybe<Scalars["Int"]["input"]>
	neq?: InputMaybe<Scalars["Int"]["input"]>
}

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
	containedBy?: InputMaybe<Array<Scalars["Int"]["input"]>>
	contains?: InputMaybe<Array<Scalars["Int"]["input"]>>
	eq?: InputMaybe<Array<Scalars["Int"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["Int"]["input"]>>
}

/** The root type for creating and mutating data */
export type Mutation = {
	__typename?: "Mutation"
	buy_stock?: Maybe<Scalars["Opaque"]["output"]>
	dblink_current_query?: Maybe<Scalars["String"]["output"]>
	dblink_fdw_validator?: Maybe<Scalars["Opaque"]["output"]>
	dblink_get_connections?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>
	/** Deletes zero or more records from the `DepotPositions` collection */
	deleteFromDepotPositionsCollection: DepotPositionsDeleteResponse
	/** Deletes zero or more records from the `DepotValues` collection */
	deleteFromDepotValuesCollection: DepotValuesDeleteResponse
	/** Deletes zero or more records from the `Depots` collection */
	deleteFromDepotsCollection: DepotsDeleteResponse
	/** Deletes zero or more records from the `StockInfo` collection */
	deleteFromStockInfoCollection: StockInfoDeleteResponse
	/** Deletes zero or more records from the `StockPrices` collection */
	deleteFromStockPricesCollection: StockPricesDeleteResponse
	/** Deletes zero or more records from the `Transactions` collection */
	deleteFromTransactionsCollection: TransactionsDeleteResponse
	/** Deletes zero or more records from the `profiles` collection */
	deleteFromprofilesCollection: ProfilesDeleteResponse
	/** Adds one or more `DepotPositions` records to the collection */
	insertIntoDepotPositionsCollection?: Maybe<DepotPositionsInsertResponse>
	/** Adds one or more `DepotValues` records to the collection */
	insertIntoDepotValuesCollection?: Maybe<DepotValuesInsertResponse>
	/** Adds one or more `Depots` records to the collection */
	insertIntoDepotsCollection?: Maybe<DepotsInsertResponse>
	/** Adds one or more `StockInfo` records to the collection */
	insertIntoStockInfoCollection?: Maybe<StockInfoInsertResponse>
	/** Adds one or more `StockPrices` records to the collection */
	insertIntoStockPricesCollection?: Maybe<StockPricesInsertResponse>
	/** Adds one or more `Transactions` records to the collection */
	insertIntoTransactionsCollection?: Maybe<TransactionsInsertResponse>
	/** Adds one or more `profiles` records to the collection */
	insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>
	log_transaction?: Maybe<Scalars["Opaque"]["output"]>
	sell_stock?: Maybe<Scalars["Opaque"]["output"]>
	/** Updates zero or more records in the `DepotPositions` collection */
	updateDepotPositionsCollection: DepotPositionsUpdateResponse
	/** Updates zero or more records in the `DepotValues` collection */
	updateDepotValuesCollection: DepotValuesUpdateResponse
	/** Updates zero or more records in the `Depots` collection */
	updateDepotsCollection: DepotsUpdateResponse
	/** Updates zero or more records in the `StockInfo` collection */
	updateStockInfoCollection: StockInfoUpdateResponse
	/** Updates zero or more records in the `StockPrices` collection */
	updateStockPricesCollection: StockPricesUpdateResponse
	/** Updates zero or more records in the `Transactions` collection */
	updateTransactionsCollection: TransactionsUpdateResponse
	update_depot_values?: Maybe<Scalars["Opaque"]["output"]>
	update_depot_values_s?: Maybe<Scalars["Opaque"]["output"]>
	/** Updates zero or more records in the `profiles` collection */
	updateprofilesCollection: ProfilesUpdateResponse
	upsert_stock_prices?: Maybe<Scalars["Opaque"]["output"]>
	upsert_stock_prices_bulk?: Maybe<Scalars["Opaque"]["output"]>
}

/** The root type for creating and mutating data */
export type MutationBuy_StockArgs = {
	p_amount: Scalars["Int"]["input"]
	p_depot_id: Scalars["BigInt"]["input"]
	p_stock_id: Scalars["BigInt"]["input"]
	p_timestamp: Scalars["Date"]["input"]
}

/** The root type for creating and mutating data */
export type MutationDblink_Fdw_ValidatorArgs = {
	catalog: Scalars["Opaque"]["input"]
	options: Array<InputMaybe<Scalars["String"]["input"]>>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromDepotPositionsCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<DepotPositionsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromDepotValuesCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<DepotValuesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromDepotsCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<DepotsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromStockInfoCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<StockInfoFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromStockPricesCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<StockPricesFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromTransactionsCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<TransactionsFilter>
}

/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<ProfilesFilter>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoDepotPositionsCollectionArgs = {
	objects: Array<DepotPositionsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoDepotValuesCollectionArgs = {
	objects: Array<DepotValuesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoDepotsCollectionArgs = {
	objects: Array<DepotsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoStockInfoCollectionArgs = {
	objects: Array<StockInfoInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoStockPricesCollectionArgs = {
	objects: Array<StockPricesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoTransactionsCollectionArgs = {
	objects: Array<TransactionsInsertInput>
}

/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
	objects: Array<ProfilesInsertInput>
}

/** The root type for creating and mutating data */
export type MutationLog_TransactionArgs = {
	p_amount: Scalars["Int"]["input"]
	p_depot_id: Scalars["BigInt"]["input"]
	p_price: Scalars["Float"]["input"]
	p_stock_id: Scalars["BigInt"]["input"]
	p_timestamp: Scalars["Date"]["input"]
}

/** The root type for creating and mutating data */
export type MutationSell_StockArgs = {
	p_amount: Scalars["Int"]["input"]
	p_depot_id: Scalars["BigInt"]["input"]
	p_stock_id: Scalars["BigInt"]["input"]
	p_timestamp: Scalars["Date"]["input"]
}

/** The root type for creating and mutating data */
export type MutationUpdateDepotPositionsCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<DepotPositionsFilter>
	set: DepotPositionsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateDepotValuesCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<DepotValuesFilter>
	set: DepotValuesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateDepotsCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<DepotsFilter>
	set: DepotsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateStockInfoCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<StockInfoFilter>
	set: StockInfoUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateStockPricesCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<StockPricesFilter>
	set: StockPricesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdateTransactionsCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<TransactionsFilter>
	set: TransactionsUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpdate_Depot_ValuesArgs = {
	p_timestamp: Scalars["Date"]["input"]
}

/** The root type for creating and mutating data */
export type MutationUpdate_Depot_Values_SArgs = {
	p_depot_id: Scalars["BigInt"]["input"]
	p_timestamp: Scalars["Date"]["input"]
}

/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
	atMost?: Scalars["Int"]["input"]
	filter?: InputMaybe<ProfilesFilter>
	set: ProfilesUpdateInput
}

/** The root type for creating and mutating data */
export type MutationUpsert_Stock_PricesArgs = {
	p_close: Scalars["Float"]["input"]
	p_high: Scalars["Float"]["input"]
	p_low: Scalars["Float"]["input"]
	p_open: Scalars["Float"]["input"]
	p_stock_id: Scalars["BigInt"]["input"]
	p_timestamp: Scalars["Date"]["input"]
	p_volume: Scalars["BigInt"]["input"]
}

/** The root type for creating and mutating data */
export type MutationUpsert_Stock_Prices_BulkArgs = {
	p_data: Scalars["JSON"]["input"]
}

export type Node = {
	/** Retrieves a record by `ID` */
	nodeId: Scalars["ID"]["output"]
}

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
	eq?: InputMaybe<Scalars["Opaque"]["input"]>
	is?: InputMaybe<FilterIs>
}

/** Defines a per-field sorting order */
export enum OrderByDirection {
	/** Ascending order, nulls first */
	AscNullsFirst = "AscNullsFirst",
	/** Ascending order, nulls last */
	AscNullsLast = "AscNullsLast",
	/** Descending order, nulls first */
	DescNullsFirst = "DescNullsFirst",
	/** Descending order, nulls last */
	DescNullsLast = "DescNullsLast",
}

export type PageInfo = {
	__typename?: "PageInfo"
	endCursor?: Maybe<Scalars["String"]["output"]>
	hasNextPage: Scalars["Boolean"]["output"]
	hasPreviousPage: Scalars["Boolean"]["output"]
	startCursor?: Maybe<Scalars["String"]["output"]>
}

/** The root type for querying data */
export type Query = {
	__typename?: "Query"
	/** A pagable collection of type `DepotPositions` */
	depotPositionsCollection?: Maybe<DepotPositionsConnection>
	/** A pagable collection of type `DepotValues` */
	depotValuesCollection?: Maybe<DepotValuesConnection>
	/** A pagable collection of type `Depots` */
	depotsCollection?: Maybe<DepotsConnection>
	/** Retrieve a record by its `ID` */
	node?: Maybe<Node>
	/** A pagable collection of type `profiles` */
	profilesCollection?: Maybe<ProfilesConnection>
	/** A pagable collection of type `StockInfo` */
	stockInfoCollection?: Maybe<StockInfoConnection>
	/** A pagable collection of type `StockPrices` */
	stockPricesCollection?: Maybe<StockPricesConnection>
	/** A pagable collection of type `Transactions` */
	transactionsCollection?: Maybe<TransactionsConnection>
}

/** The root type for querying data */
export type QueryDepotPositionsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<DepotPositionsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<DepotPositionsOrderBy>>
}

/** The root type for querying data */
export type QueryDepotValuesCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<DepotValuesFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<DepotValuesOrderBy>>
}

/** The root type for querying data */
export type QueryDepotsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<DepotsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<DepotsOrderBy>>
}

/** The root type for querying data */
export type QueryNodeArgs = {
	nodeId: Scalars["ID"]["input"]
}

/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<ProfilesFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<ProfilesOrderBy>>
}

/** The root type for querying data */
export type QueryStockInfoCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<StockInfoFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<StockInfoOrderBy>>
}

/** The root type for querying data */
export type QueryStockPricesCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<StockPricesFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<StockPricesOrderBy>>
}

/** The root type for querying data */
export type QueryTransactionsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<TransactionsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<TransactionsOrderBy>>
}

export type StockInfo = Node & {
	__typename?: "StockInfo"
	depotPositionsCollection?: Maybe<DepotPositionsConnection>
	description: Scalars["String"]["output"]
	id: Scalars["BigInt"]["output"]
	name: Scalars["String"]["output"]
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
	stockPricesCollection?: Maybe<StockPricesConnection>
	symbol: Scalars["String"]["output"]
	transactionsCollection?: Maybe<TransactionsConnection>
	type: StockType
}

export type StockInfoDepotPositionsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<DepotPositionsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<DepotPositionsOrderBy>>
}

export type StockInfoStockPricesCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<StockPricesFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<StockPricesOrderBy>>
}

export type StockInfoTransactionsCollectionArgs = {
	after?: InputMaybe<Scalars["Cursor"]["input"]>
	before?: InputMaybe<Scalars["Cursor"]["input"]>
	filter?: InputMaybe<TransactionsFilter>
	first?: InputMaybe<Scalars["Int"]["input"]>
	last?: InputMaybe<Scalars["Int"]["input"]>
	offset?: InputMaybe<Scalars["Int"]["input"]>
	orderBy?: InputMaybe<Array<TransactionsOrderBy>>
}

export type StockInfoConnection = {
	__typename?: "StockInfoConnection"
	edges: Array<StockInfoEdge>
	pageInfo: PageInfo
}

export type StockInfoDeleteResponse = {
	__typename?: "StockInfoDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<StockInfo>
}

export type StockInfoEdge = {
	__typename?: "StockInfoEdge"
	cursor: Scalars["String"]["output"]
	node: StockInfo
}

export type StockInfoFilter = {
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<StockInfoFilter>>
	description?: InputMaybe<StringFilter>
	id?: InputMaybe<BigIntFilter>
	name?: InputMaybe<StringFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<StockInfoFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<StockInfoFilter>>
	symbol?: InputMaybe<StringFilter>
	type?: InputMaybe<StockTypeFilter>
}

export type StockInfoInsertInput = {
	description?: InputMaybe<Scalars["String"]["input"]>
	name?: InputMaybe<Scalars["String"]["input"]>
	symbol?: InputMaybe<Scalars["String"]["input"]>
	type?: InputMaybe<StockType>
}

export type StockInfoInsertResponse = {
	__typename?: "StockInfoInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<StockInfo>
}

export type StockInfoOrderBy = {
	description?: InputMaybe<OrderByDirection>
	id?: InputMaybe<OrderByDirection>
	name?: InputMaybe<OrderByDirection>
	symbol?: InputMaybe<OrderByDirection>
	type?: InputMaybe<OrderByDirection>
}

export type StockInfoUpdateInput = {
	description?: InputMaybe<Scalars["String"]["input"]>
	name?: InputMaybe<Scalars["String"]["input"]>
	symbol?: InputMaybe<Scalars["String"]["input"]>
	type?: InputMaybe<StockType>
}

export type StockInfoUpdateResponse = {
	__typename?: "StockInfoUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<StockInfo>
}

export type StockPrices = Node & {
	__typename?: "StockPrices"
	close: Scalars["Float"]["output"]
	high: Scalars["Float"]["output"]
	low: Scalars["Float"]["output"]
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
	open: Scalars["Float"]["output"]
	price_id: Scalars["BigInt"]["output"]
	stockInfo?: Maybe<StockInfo>
	stock_id: Scalars["BigInt"]["output"]
	timestamp: Scalars["Date"]["output"]
	volume: Scalars["BigInt"]["output"]
}

export type StockPricesConnection = {
	__typename?: "StockPricesConnection"
	edges: Array<StockPricesEdge>
	pageInfo: PageInfo
}

export type StockPricesDeleteResponse = {
	__typename?: "StockPricesDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<StockPrices>
}

export type StockPricesEdge = {
	__typename?: "StockPricesEdge"
	cursor: Scalars["String"]["output"]
	node: StockPrices
}

export type StockPricesFilter = {
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<StockPricesFilter>>
	close?: InputMaybe<FloatFilter>
	high?: InputMaybe<FloatFilter>
	low?: InputMaybe<FloatFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<StockPricesFilter>
	open?: InputMaybe<FloatFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<StockPricesFilter>>
	price_id?: InputMaybe<BigIntFilter>
	stock_id?: InputMaybe<BigIntFilter>
	timestamp?: InputMaybe<DateFilter>
	volume?: InputMaybe<BigIntFilter>
}

export type StockPricesInsertInput = {
	close?: InputMaybe<Scalars["Float"]["input"]>
	high?: InputMaybe<Scalars["Float"]["input"]>
	low?: InputMaybe<Scalars["Float"]["input"]>
	open?: InputMaybe<Scalars["Float"]["input"]>
	stock_id?: InputMaybe<Scalars["BigInt"]["input"]>
	timestamp?: InputMaybe<Scalars["Date"]["input"]>
	volume?: InputMaybe<Scalars["BigInt"]["input"]>
}

export type StockPricesInsertResponse = {
	__typename?: "StockPricesInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<StockPrices>
}

export type StockPricesOrderBy = {
	close?: InputMaybe<OrderByDirection>
	high?: InputMaybe<OrderByDirection>
	low?: InputMaybe<OrderByDirection>
	open?: InputMaybe<OrderByDirection>
	price_id?: InputMaybe<OrderByDirection>
	stock_id?: InputMaybe<OrderByDirection>
	timestamp?: InputMaybe<OrderByDirection>
	volume?: InputMaybe<OrderByDirection>
}

export type StockPricesUpdateInput = {
	close?: InputMaybe<Scalars["Float"]["input"]>
	high?: InputMaybe<Scalars["Float"]["input"]>
	low?: InputMaybe<Scalars["Float"]["input"]>
	open?: InputMaybe<Scalars["Float"]["input"]>
	stock_id?: InputMaybe<Scalars["BigInt"]["input"]>
	timestamp?: InputMaybe<Scalars["Date"]["input"]>
	volume?: InputMaybe<Scalars["BigInt"]["input"]>
}

export type StockPricesUpdateResponse = {
	__typename?: "StockPricesUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<StockPrices>
}

export enum StockType {
	Crypto = "crypto",
	Currency = "currency",
	Etf = "etf",
	Stock = "stock",
}

/** Boolean expression comparing fields on type "StockType" */
export type StockTypeFilter = {
	eq?: InputMaybe<StockType>
	in?: InputMaybe<Array<StockType>>
	is?: InputMaybe<FilterIs>
	neq?: InputMaybe<StockType>
}

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
	eq?: InputMaybe<Scalars["String"]["input"]>
	gt?: InputMaybe<Scalars["String"]["input"]>
	gte?: InputMaybe<Scalars["String"]["input"]>
	ilike?: InputMaybe<Scalars["String"]["input"]>
	in?: InputMaybe<Array<Scalars["String"]["input"]>>
	iregex?: InputMaybe<Scalars["String"]["input"]>
	is?: InputMaybe<FilterIs>
	like?: InputMaybe<Scalars["String"]["input"]>
	lt?: InputMaybe<Scalars["String"]["input"]>
	lte?: InputMaybe<Scalars["String"]["input"]>
	neq?: InputMaybe<Scalars["String"]["input"]>
	regex?: InputMaybe<Scalars["String"]["input"]>
	startsWith?: InputMaybe<Scalars["String"]["input"]>
}

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
	containedBy?: InputMaybe<Array<Scalars["String"]["input"]>>
	contains?: InputMaybe<Array<Scalars["String"]["input"]>>
	eq?: InputMaybe<Array<Scalars["String"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["String"]["input"]>>
}

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
	eq?: InputMaybe<Scalars["Time"]["input"]>
	gt?: InputMaybe<Scalars["Time"]["input"]>
	gte?: InputMaybe<Scalars["Time"]["input"]>
	in?: InputMaybe<Array<Scalars["Time"]["input"]>>
	is?: InputMaybe<FilterIs>
	lt?: InputMaybe<Scalars["Time"]["input"]>
	lte?: InputMaybe<Scalars["Time"]["input"]>
	neq?: InputMaybe<Scalars["Time"]["input"]>
}

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
	containedBy?: InputMaybe<Array<Scalars["Time"]["input"]>>
	contains?: InputMaybe<Array<Scalars["Time"]["input"]>>
	eq?: InputMaybe<Array<Scalars["Time"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["Time"]["input"]>>
}

export type Transactions = Node & {
	__typename?: "Transactions"
	amount: Scalars["Int"]["output"]
	depot_id: Scalars["BigInt"]["output"]
	depots?: Maybe<Depots>
	id: Scalars["BigInt"]["output"]
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
	price: Scalars["Float"]["output"]
	stockInfo?: Maybe<StockInfo>
	stock_id: Scalars["BigInt"]["output"]
	timestamp: Scalars["Date"]["output"]
}

export type TransactionsConnection = {
	__typename?: "TransactionsConnection"
	edges: Array<TransactionsEdge>
	pageInfo: PageInfo
}

export type TransactionsDeleteResponse = {
	__typename?: "TransactionsDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Transactions>
}

export type TransactionsEdge = {
	__typename?: "TransactionsEdge"
	cursor: Scalars["String"]["output"]
	node: Transactions
}

export type TransactionsFilter = {
	amount?: InputMaybe<IntFilter>
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<TransactionsFilter>>
	depot_id?: InputMaybe<BigIntFilter>
	id?: InputMaybe<BigIntFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<TransactionsFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<TransactionsFilter>>
	price?: InputMaybe<FloatFilter>
	stock_id?: InputMaybe<BigIntFilter>
	timestamp?: InputMaybe<DateFilter>
}

export type TransactionsInsertInput = {
	amount?: InputMaybe<Scalars["Int"]["input"]>
	depot_id?: InputMaybe<Scalars["BigInt"]["input"]>
	price?: InputMaybe<Scalars["Float"]["input"]>
	stock_id?: InputMaybe<Scalars["BigInt"]["input"]>
	timestamp?: InputMaybe<Scalars["Date"]["input"]>
}

export type TransactionsInsertResponse = {
	__typename?: "TransactionsInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Transactions>
}

export type TransactionsOrderBy = {
	amount?: InputMaybe<OrderByDirection>
	depot_id?: InputMaybe<OrderByDirection>
	id?: InputMaybe<OrderByDirection>
	price?: InputMaybe<OrderByDirection>
	stock_id?: InputMaybe<OrderByDirection>
	timestamp?: InputMaybe<OrderByDirection>
}

export type TransactionsUpdateInput = {
	amount?: InputMaybe<Scalars["Int"]["input"]>
	depot_id?: InputMaybe<Scalars["BigInt"]["input"]>
	price?: InputMaybe<Scalars["Float"]["input"]>
	stock_id?: InputMaybe<Scalars["BigInt"]["input"]>
	timestamp?: InputMaybe<Scalars["Date"]["input"]>
}

export type TransactionsUpdateResponse = {
	__typename?: "TransactionsUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Transactions>
}

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
	eq?: InputMaybe<Scalars["UUID"]["input"]>
	in?: InputMaybe<Array<Scalars["UUID"]["input"]>>
	is?: InputMaybe<FilterIs>
	neq?: InputMaybe<Scalars["UUID"]["input"]>
}

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
	containedBy?: InputMaybe<Array<Scalars["UUID"]["input"]>>
	contains?: InputMaybe<Array<Scalars["UUID"]["input"]>>
	eq?: InputMaybe<Array<Scalars["UUID"]["input"]>>
	is?: InputMaybe<FilterIs>
	overlaps?: InputMaybe<Array<Scalars["UUID"]["input"]>>
}

export type Profiles = Node & {
	__typename?: "profiles"
	depots?: Maybe<Depots>
	id: Scalars["UUID"]["output"]
	name?: Maybe<Scalars["String"]["output"]>
	/** Globally Unique Record Identifier */
	nodeId: Scalars["ID"]["output"]
}

export type ProfilesConnection = {
	__typename?: "profilesConnection"
	edges: Array<ProfilesEdge>
	pageInfo: PageInfo
}

export type ProfilesDeleteResponse = {
	__typename?: "profilesDeleteResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Profiles>
}

export type ProfilesEdge = {
	__typename?: "profilesEdge"
	cursor: Scalars["String"]["output"]
	node: Profiles
}

export type ProfilesFilter = {
	/** Returns true only if all its inner filters are true, otherwise returns false */
	and?: InputMaybe<Array<ProfilesFilter>>
	id?: InputMaybe<UuidFilter>
	name?: InputMaybe<StringFilter>
	nodeId?: InputMaybe<IdFilter>
	/** Negates a filter */
	not?: InputMaybe<ProfilesFilter>
	/** Returns true if at least one of its inner filters is true, otherwise returns false */
	or?: InputMaybe<Array<ProfilesFilter>>
}

export type ProfilesInsertInput = {
	id?: InputMaybe<Scalars["UUID"]["input"]>
	name?: InputMaybe<Scalars["String"]["input"]>
}

export type ProfilesInsertResponse = {
	__typename?: "profilesInsertResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Profiles>
}

export type ProfilesOrderBy = {
	id?: InputMaybe<OrderByDirection>
	name?: InputMaybe<OrderByDirection>
}

export type ProfilesUpdateInput = {
	id?: InputMaybe<Scalars["UUID"]["input"]>
	name?: InputMaybe<Scalars["String"]["input"]>
}

export type ProfilesUpdateResponse = {
	__typename?: "profilesUpdateResponse"
	/** Count of the records impacted by the mutation */
	affectedCount: Scalars["Int"]["output"]
	/** Array of records impacted by the mutation */
	records: Array<Profiles>
}

export type GetDepotsQueryVariables = Exact<{
	user: Scalars["UUID"]["input"]
}>

export type GetDepotsQuery = {
	__typename: "Query"
	profilesCollection?: {
		__typename: "profilesConnection"
		edges: Array<{
			__typename: "profilesEdge"
			node: {
				__typename: "profiles"
				depots?: {
					__typename: "Depots"
					name?: string | null
					created_at: string
					id: string
				} | null
			}
		}>
	} | null
}

export type GetPositionsQueryVariables = Exact<{
	depot: Scalars["BigInt"]["input"]
}>

export type GetPositionsQuery = {
	__typename: "Query"
	depotPositionsCollection?: {
		__typename: "DepotPositionsConnection"
		edges: Array<{
			__typename: "DepotPositionsEdge"
			node: {
				__typename: "DepotPositions"
				amount: number
				stockInfo?: {
					__typename: "StockInfo"
					symbol: string
					name: string
					description: string
					id: string
					type: StockType
					transactionsCollection?: {
						__typename: "TransactionsConnection"
						edges: Array<{
							__typename: "TransactionsEdge"
							node: {
								__typename: "Transactions"
								amount: number
								price: number
								timestamp: string
							}
						}>
					} | null
					stockPricesCollection?: {
						__typename: "StockPricesConnection"
						edges: Array<{
							__typename: "StockPricesEdge"
							node: {
								__typename: "StockPrices"
								timestamp: string
								open: number
								close: number
								high: number
								low: number
								volume: string
							}
						}>
					} | null
				} | null
			}
		}>
	} | null
}

export type GetDepotValuesQueryVariables = Exact<{
	depot: Scalars["BigInt"]["input"]
}>

export type GetDepotValuesQuery = {
	__typename: "Query"
	depotValuesCollection?: {
		__typename: "DepotValuesConnection"
		edges: Array<{
			__typename: "DepotValuesEdge"
			node: {
				__typename: "DepotValues"
				timestamp: string
				stock_assets: number
				liquid_assets: number
			}
		}>
	} | null
}
