# Error

Error object which contains details about error.

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**source** | **str** | The application name that generated this error. Every error message that is generated and returned by the gateway will have this field equal to Gateway. | 
**reason_code** | **str** | A unique constant identifying the error case encountered during request processing. | 
**description** | **str** | Short description of the ReasonCode field. | 
**recoverable** | **bool** | Indicates whether this error will always be returned for this request, or retrying could change the outcome. | 
**details** | **str** | (Optional) Where appropriate, indicates detailed information about data received and calculated during request processing, to help the user with diagnosing errors. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


