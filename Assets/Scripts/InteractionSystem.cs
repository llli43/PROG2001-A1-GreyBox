using UnityEngine;
using TMPro;

/// <summary>
/// 交互系统
/// 检测玩家前方的可交互对象并处理交互输入
/// </summary>
public class InteractionSystem : MonoBehaviour
{
    [Header("交互检测设置")]
    [SerializeField] private float interactionRange = 3f;
    [SerializeField] private LayerMask interactableLayer;
    [SerializeField] private Transform cameraTransform;
    
    [Header("UI设置")]
    [SerializeField] private TextMeshProUGUI interactionText;
    [SerializeField] private GameObject crosshair;
    
    private InteractableObject currentInteractable;
    
    void Start()
    {
        // 如果没有指定相机，使用主相机
        if (cameraTransform == null)
        {
            cameraTransform = Camera.main.transform;
        }
        
        // 初始化UI
        if (interactionText != null)
        {
            interactionText.gameObject.SetActive(false);
        }
    }
    
    void Update()
    {
        CheckForInteractable();
        HandleInteractionInput();
    }
    
    /// <summary>
    /// 检测前方的可交互对象
    /// </summary>
    void CheckForInteractable()
    {
        RaycastHit hit;
        
        // 从屏幕中心发射射线
        if (Physics.Raycast(cameraTransform.position, cameraTransform.forward, out hit, interactionRange, interactableLayer))
        {
            InteractableObject interactable = hit.collider.GetComponent<InteractableObject>();
            
            if (interactable != null && interactable.CanInteract)
            {
                // 发现新的可交互对象
                if (currentInteractable != interactable)
                {
                    // 取消之前对象的高亮
                    if (currentInteractable != null)
                    {
                        currentInteractable.Unhighlight();
                    }
                    
                    currentInteractable = interactable;
                    currentInteractable.Highlight();
                    ShowInteractionPrompt(currentInteractable.InteractionPrompt);
                }
            }
            else
            {
                ClearCurrentInteractable();
            }
        }
        else
        {
            ClearCurrentInteractable();
        }
    }
    
    /// <summary>
    /// 清除当前可交互对象
    /// </summary>
    void ClearCurrentInteractable()
    {
        if (currentInteractable != null)
        {
            currentInteractable.Unhighlight();
            currentInteractable = null;
            HideInteractionPrompt();
        }
    }
    
    /// <summary>
    /// 处理交互输入
    /// </summary>
    void HandleInteractionInput()
    {
        if (currentInteractable != null && Input.GetKeyDown(KeyCode.E))
        {
            currentInteractable.Interact();
            
            // 如果不能多次交互，隐藏提示
            if (!currentInteractable.CanInteract)
            {
                HideInteractionPrompt();
            }
        }
    }
    
    /// <summary>
    /// 显示交互提示
    /// </summary>
    void ShowInteractionPrompt(string prompt)
    {
        if (interactionText != null)
        {
            interactionText.text = prompt;
            interactionText.gameObject.SetActive(true);
        }
    }
    
    /// <summary>
    /// 隐藏交互提示
    /// </summary>
    void HideInteractionPrompt()
    {
        if (interactionText != null)
        {
            interactionText.gameObject.SetActive(false);
        }
    }
    
    // 在编辑器中可视化交互范围
    void OnDrawGizmosSelected()
    {
        if (cameraTransform != null)
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawRay(cameraTransform.position, cameraTransform.forward * interactionRange);
        }
    }
}
